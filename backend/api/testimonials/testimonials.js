const { getTestimonials, getReviews, getTestimonialsByUserType } = require("../../controller/testimonials/testimonials");

const getAllTestimonials = async (req, res) => {

    const result = await getTestimonials();

    return res.json({ result })

}

const getAllStudentTestimonials = async (req, res) => {

    const {page, limit, is_student} = req.query
    
    const result = await getReviews(page, limit, is_student);

    return res.json({ result })

}

const getAllTestimonialsByUserType = async (req, res) => {
    const { user_type } = req.params;
    const result = await getTestimonialsByUserType(user_type);

    return res.json({ result })

}

module.exports = {
    getAllTestimonials,
    getAllStudentTestimonials,
    getAllTestimonialsByUserType
};