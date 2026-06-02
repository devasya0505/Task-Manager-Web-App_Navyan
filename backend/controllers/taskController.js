const Task = require('../models/Task');

// @desc    Get all tasks for authenticated user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, category, search, sortBy } = req.query;

    // Build filter query
    const filter = { user: req.user._id };

    if (status && status !== 'all') {
      filter.status = status;
    }

    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    if (category && category !== 'all') {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort options
    let sort = { order: 1, createdAt: -1 };
    if (sortBy === 'dueDate') {
      sort = { dueDate: 1, order: 1 };
    } else if (sortBy === 'priority') {
      sort = { priority: -1, order: 1 };
    } else if (sortBy === 'createdAt') {
      sort = { createdAt: -1 };
    } else if (sortBy === 'title') {
      sort = { title: 1 };
    }

    const tasks = await Task.find(filter).sort(sort);
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Server error fetching tasks' });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, priority, category, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Please provide a task title' });
    }

    // Get the highest order number for this user's tasks
    const lastTask = await Task.findOne({ user: req.user._id }).sort({ order: -1 });
    const order = lastTask ? lastTask.order + 1 : 0;

    const task = await Task.create({
      user: req.user._id,
      title,
      description: description || '',
      priority: priority || 'medium',
      category: category || 'General',
      dueDate: dueDate || null,
      order
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Create task error:', error.message);
    res.status(500).json({ message: 'Server error creating task' });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Verify ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this task' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ message: 'Server error updating task' });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Verify ownership
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ message: 'Server error deleting task' });
  }
};

// @desc    Reorder tasks (for drag & drop)
// @route   PUT /api/tasks/reorder
// @access  Private
const reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body;

    if (!tasks || !Array.isArray(tasks)) {
      return res.status(400).json({ message: 'Please provide tasks array' });
    }

    // Update order for each task
    const updatePromises = tasks.map((item, index) =>
      Task.findOneAndUpdate(
        { _id: item._id, user: req.user._id },
        { order: index },
        { new: true }
      )
    );

    await Promise.all(updatePromises);
    res.json({ message: 'Tasks reordered successfully' });
  } catch (error) {
    console.error('Reorder tasks error:', error.message);
    res.status(500).json({ message: 'Server error reordering tasks' });
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, reorderTasks };
