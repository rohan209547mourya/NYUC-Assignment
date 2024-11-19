const { User, validateUser } = require('../model/UserModel');
const bcrypt = require('bcryptjs');

const registerNewUser = async (req, res, next) => {
    try {
        const requestData = req.body;

        console.log("requestData", requestData);

        const isvalidData = validateUser(requestData);

        if (isvalidData.error) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: isvalidData.error.details[0].message
            })
        }

        const isUserExist = await User.findOne({ email: requestData.email });
        if (isUserExist) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: "User already exist"
            })
        }

        const user = new User({
            name: requestData.name,
            email: requestData.email,
            password: requestData.password,
            mobile: requestData.mobile,
            imageUrl: requestData.imageUrl,
            createdAt: new Date(),
        });


        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        
        await user.save();

        res.status(201).json({
            message: "User has been registed successfully",
            code: 201,
        })

    } catch (error) {
        next(error);
    }
}


const loginUser = async (req, res, next) => {
    try {
        const requestData = req.body;

        const user = await User.findOne({ email: requestData.email });
        if (!user) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(requestData.password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: "Invalid password"
            })
        }

        res.status(200).json({
            message: "User has been logged in successfully",
            code: 200,
            user: {
                email: user.email,
                name: user.name,
                mobile: user.mobile,
                imageUrl: user.imageUrl,
                createdAt: user.createdAt
            }
        })

    } catch (error) {
        next(error);
    }
}


const getUserData = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        if (!user) {
            return res.status(400).json({
                status: "Bad Request",
                code: 400,
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User data",
            code: 200,
            data: user
        })

    } catch (error) {
        next(error);
    }
}




module.exports = {
    registerNewUser,
    loginUser,
    getUserData
};