const User = require('../models/userModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');


exports.createUser = catchAsync( async(req,res,next)=>{
    const user = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            user
        }
    })
})

exports.getAllUsers = catchAsync( async(req,res,next)=>{
    const users = await User.find().populate({path:'users'});;
    res.status(200).json({
        status: 'success',
        data: {
            users
        }
    })
})

exports.updateUser =  catchAsync(async (req,res,next)=>{
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    if(!updatedUser){
        return next(new AppError('No document found with this ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data:{
            data: updatedUser
        }
    })
})

exports.deleteUser =  catchAsync(async (req,res,next)=>{
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if(!deletedUser){
        return next( new AppError('No document found with this ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
})