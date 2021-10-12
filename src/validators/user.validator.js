import { check } from 'express-validator'
import { validateResult } from '../helpers/validatehelper'

//import {check} from 'express-validator'



export const validateCreateUser = [
    check('name')
    .not()
    .isEmpty(),
    check('email')
    .exists()
    .isEmail()
    .isLowercase()
    .not()
    .isEmpty(),
    check('country')
    .isAlpha()
    .not()
    .isEmpty(),
    check('city')
    .isAlpha()
    .not()
    .isEmpty(),
    check('password')
    .exists()
    .isAlphanumeric()
    .isLength({ min: 8, max: 12 })
    .not()
    .isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next)
    },
]


export const validateEliminateUser = [
    check('_id')
    .exists(),
    (req, res, next) => {
        validateResult(req, res, next)
    },
]


export const validateUpdateUser = [
    check('email')
    .exists()
    .isEmail()
    .isLowercase()
    .not(),
    check('password')
    .isLength({ min: 8, max: 12 })
    .not(),
    (req, res, next) => {
        validateResult(req, res, next)
    },
]

export const validateOneUser = [
    check('email')
    .exists()
    .isEmail()
    .isLowercase()
    .not(),
    (req, res, next) => {
        validateResult(req, res, next)
    },
]
