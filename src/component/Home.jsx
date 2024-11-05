import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All'); 

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('todo'));  
    if (savedItems) {
      setItems(savedItems);
    }
  }, []);


  const toggleCompletion = (id) => {
    setItems((prevItems) => 
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addItemsToLocalStorage = (items) => {
      console.log(items,"Adding to local");
      localStorage.setItem('todo',JSON.stringify(items));
  }

  const addItem = () => {
    if (newItem.trim()) {
      const newId = items.length ? items[items.length - 1].id + 1 : 1; 
      const newItems = [...items, { id: newId, text: newItem, completed: false }]
      const sortedItems = newItems.sort((a, b) => a.text.localeCompare(b.text));

      setItems(sortedItems);
      addItemsToLocalStorage(sortedItems);
      setNewItem(''); 
      setIsModalOpen(false);
    }
  };

  const deleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    console.log(newItems, "after deleting");
    addItemsToLocalStorage(newItems);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const filteredItems = items.filter((item) => {
    if (filterStatus === 'Completed') return item.completed;
    if (filterStatus === 'Pending') return !item.completed;
    return true; 
  });

  const pendingCount = items.filter(item => !item.completed).length;
  // const completedCount = items.length - pendingCount; 
  const totalCount = items.length; 
  const completedTasks = items.filter(item => item.completed);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <h2 className="text-2xl mb-4 text-center font-bold">Todo List</h2>
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4">Add New Todo Item</h3>
            <input type="text" className="border border-gray-300 p-2 w-full rounded mb-4"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter new task"
            />
            <div className="flex justify-end">
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 w-64"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
                onClick={addItem}
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Item
        </button>
      </div>
  
      <table className="min-w-full border border-gray-200 overflow-auto">
        <thead>
          <tr className="bg-gray-200 text:xs sm:text-sm md:text-base">
          <th className="px-4 py-2 text-start">Complete</th>
          <th className="px-4 py-2 text-left">Task</th>
           
            <th className="px-4 py-2">
              <select
                className="border border-gray-300 rounded-lg px-4 py-2"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Tasks</option>
                <option value="Completed">Completed Tasks</option>
                <option value="Pending">Pending Tasks</option>
              </select>
            </th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className={item.completed ? 'line-through text-gray-400' : ''}>
              
              <td className="px-4 py-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCompletion(item.id)}
                />
              </td>
              <td className="px-4 py-2">{item.text}</td>
              <td className="px-4 py-2 text-end">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
        {/* <tr>
            <td className="px-4 py-2 font-bold">Total Completed Tasks:</td>
            <td colSpan="2" className="px-4 py-2 text-center font-bold">
              {completedCount}
            </td>
          </tr> */}
          <tr>
            <td className="px-4 py-2 font-bold text-start">Total Pending Items:</td>
            <td colSpan="2" className="px-4 py-2 text-end font-bold">
              {pendingCount}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="w-full justify-center items-center h-48 flex md:justify-between md:flex-row lg:flex-row flex-col md:mt-0 mt-16">
      <div className="border border-gray-300  rounded-lg w-96 p-4 ">
        <h3 className="text-xl font-semibold mb-2">Total Tasks: {totalCount}</h3>
      </div>

      <div className="border border-gray-300  rounded-lg p-4  w-96 ">
        <h3 className="text-xl font-semibold mb-2">Completed Tasks : {completedTasks.length}</h3>
        {completedTasks.length > 0 ? (
          <ul className="list-disc pl-5">
            {completedTasks.map(task => (
              <li key={task.id} className="text-gray-600">{task.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No completed tasks yet.</p>
        )}
      </div>

      <div className="border border-gray-300 rounded-lg p-4 w-96">
        <h3 className="text-xl font-semibold mb-2">Total Pending Tasks: {pendingCount}</h3>
      </div>
      </div>
    </div>
    
  );
};

export default Todo;
