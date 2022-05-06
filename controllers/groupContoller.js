const Group = require('../models/groupModel');
const catchAsync = require('../util/catchAsync');
const AppError = require('../util/appError');

exports.createGroup = catchAsync(async (req,res,next)=>{
    const group = await Group.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            group
        }
    })
})

exports.getAllGroups = catchAsync( async(req,res,next)=>{
    const groups = await Group.find().populate({path:'users', select: 'username'});

    res.status(200).json({
        status: 'success',
        data: {
            groups
        }
    })
})

exports.updateGroup =  catchAsync(async (req,res,next)=>{
    const updatedGroup = await Group.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    });
    if(!updatedGroup){
        return next(new AppError('No document found with this ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data:{
            data: updatedGroup
        }
    })
})

exports.deleteGroup =  catchAsync(async (req,res,next)=>{

    const findGroup = await Group.findById(req.params.id).populate({path: 'users'});
    if(findGroup.users.length) {
        return next(new AppError('Can not delete group that has users inside', 401))
    }
    const deletedGroup = await Group.findByIdAndDelete(req.params.id)
    if(!deletedGroup){
        return next(new AppError('No document found with this ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: null
    })
})