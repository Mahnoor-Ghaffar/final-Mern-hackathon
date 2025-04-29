// //task controller
// import Task from '../models/task.js';


// export const createTask = async (req, res) => {
//   try {
//     const { title, description, assignedTo } = req.body;

//     const task = await Task.create({
//       title,
//       description,
//       assignedTo,
//       createdBy: req.user.id,
//     });

//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find();
//     res.json(tasks);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const updateTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     task.title = req.body.title || task.title;
//     task.description = req.body.description || task.description;
//     task.assignedTo = req.body.assignedTo || task.assignedTo;
//     task.status = req.body.status || task.status;

//     const updatedTask = await task.save();
//     res.json(updatedTask);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const deleteTask = async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ message: 'Task not found' });
//     }

//     // Replace task.remove() with one of these options:
//     await Task.deleteOne({ _id: req.params.id });
//     // OR
//     // await Task.findByIdAndDelete(req.params.id);
    
//     res.json({ message: 'Task deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// export const moveTask = async (req, res) => {
//     try {
//       const { status } = req.body;
//       const task = await Task.findById(req.params.id);
//       if (!task) return res.status(404).json({ message: 'Task not found' });
  
//       // only update status
//       task.status = status;
//       const updated = await task.save();
//       res.json(updated);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   };
  
import Task from '../models/task.js';

// @desc    Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedTo, status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        assignedTo,
        status,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Move (change status) of a task
export const moveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error('Error moving task:', error);
    res.status(500).json({ message: error.message });
  }
};
