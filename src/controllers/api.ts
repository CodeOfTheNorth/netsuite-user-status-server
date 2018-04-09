'use strict';

// import * as async from 'async';
// import * as request from 'request';
// import * as graph from 'fbgraph';
import { default as User, UserModel } from '../models/User';
import { Request, Response, NextFunction } from 'express';

/**
 * POST /api
 * Create a new account
 */
export let createAccount = (req: Request, res: Response, next: NextFunction) => {

    const errors = req.validationErrors();

    if (errors) {
        console.log('Error updating an account', errors);
        return res.send(errors);
    }

    // const user = new User({
    //     name: req.body.company,
    //     account: req.body.password,
    //     logo: req.body.password,
    //     lastSeen: req.body.password,
    // });
    const update = {
        $set : {
            name: req.body.company,
            account: req.body.password,
            logo: req.body.password,
            lastSeen: req.body.password,
        }
    };
    const search = {
        name: req.body.name
    };
    const options = {
        returnNewDocument: true,
        upsert: true
    };

    User.findOneAndUpdate(search, update, options, (err, existingUser) => {
        if (err) { return next(err); }
        res.send(existingUser);
        console.log(`Account ${existingUser._id} updated successfully`);
        // if (existingUser) {
        //     // res.send({ msg: `User ${newUser.name} updated successfully.` });
        //     res.send(existingUser);
        // } else {
        //     user.save((err: Error, newUser: UserModel) => {
        //         if (err) { return next(err); }
        //         // res.send({ msg: `User ${newUser.name} created successfully` });
        //         res.send(newUser);
        //         // console.log(`Account ${newUser._id} created successfully`);
        //     });
        // }
    });
};

/**
 * GET /api
 * Retrieve a list of packages
 */
// export let getPackages = (req: Request, res: Response) => {
//     User.findOne({ email: req.params.email }, (err: Error, foundUser: UserModel) => {
//         if (err) {
//             return res.send({ msg: 'The user does not exist.' });
//         }
//         if (!foundUser) {
//             return res.send({ msg: 'User not found' });
//         }
//         const packageIds = foundUser.packages;
//         Package.find({ _id: [packageIds] })
//             .then((packages) => {
//                 res.send(packages);
//             });
//     });
// };
