const { where } = require('sequelize');
const { User, Testimonials } = require('../../models');
const getTestimonials = async (page = 1, limit = 4) => {
    try {
        const offset = (page - 1) * limit;

        const totalTestimonials = await Testimonials.count();

        const testimonials = await Testimonials.findAll({
            offset: offset,
            limit: limit,
            include: [{
                model: User,
                as: 'users'
            }]
        });

        const totalPages = Math.ceil(totalTestimonials / limit);

        return {
            data: testimonials,
            meta: {
                total: totalTestimonials,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        return error;
    }
}

const getReviews = async (page = 1, limit = 10, is_student) => {
    try {
        const offset = (page - 1) * limit;

        const totalReviews = await Testimonials.count();

        const Reviews = await Testimonials.findAll({
            where: { is_student: is_student },
            offset: offset,
            limit: limit, include: [{
                model: User,
                as: 'users'
            }]
        });

        const totalPages = Math.ceil(totalReviews / limit);

        return {
            data: Reviews,
            meta: {
                total: totalReviews,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        return error;
    }
}

const getTestimonialsByUserType = async (user_type, page = 1, limit = 4) => {
    try {
        const offset = (page - 1) * limit;

        const totalTestimonials = await Testimonials.count({
            include: [{
                model: User,
                as: 'users',
                where: { user_type: user_type }
            }]
        });

        const testimonials = await Testimonials.findAll({
            offset: offset,
            limit: limit,
            include: [{
                model: User,
                as: 'users',
                where: { user_type: user_type }
            }]
        });

        const totalPages = Math.ceil(totalTestimonials / limit);

        return {
            data: testimonials,
            meta: {
                total: totalTestimonials,
                totalPages,
                currentPage: page,
                perPage: limit,
            },
        };
    } catch (error) {
        console.error("Server error:", error);
        return error;
    }
}

module.exports = {
    getTestimonials,
    getTestimonialsByUserType,
    getReviews
};