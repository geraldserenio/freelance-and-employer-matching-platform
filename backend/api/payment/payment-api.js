const { getPaymentsByFreelancerIdController, getPaymentsByIdController, getPaymentsByBusinessIdController, deletePaymentsontroller, storePayment, updatePaymentStatusontroller } = require("../../controller/payments/payments");
const { verifyToken } = require("../verifyToken");

const getPaymentByFreelancerIddAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const id = req.query.user_id;
        const page = req.query.page;
        const status = req.query.status;
        const result = await getPaymentsByFreelancerIdController(id, status, page);

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const getPaymentByIdAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { id } = req.params;
        const result = await getPaymentsByIdController(id)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const getPaymentByBusinessIdAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const id = req.query.user_id;
        const page = req.query.page;
        const status = req.query.status;
        const result = await getPaymentsByBusinessIdController(id, status, page)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const getPaymentByAdminIdAPI = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const page = req.query.page;
        const status = req.query.status;
        const result = await getPaymentsByBusinessIdController(null, status, page)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const storePaymentAPI = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { amount, remarks, status } = req.body;

        if (!amount || !remarks) {
            return res.status(400).json({ message: 'Amount and remarks are required!' });
        }
        
        if (verifiedToken?.user_type !== "business" && verifiedToken?.user_type !== "admin") {
            if (req.body?.id && status != "sent") {
                return res.status(400).json({ message: 'Only withdrawal that is not yet opened or approved by the client is allowed to be updated.' });
            }
        }


        const result = await storePayment(req.body)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const deletePaymentAPI = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { id } = req.params;

        const result = await deletePaymentsontroller(id)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}

const updatePaymentStatusAPI = async (req, res) => {
    // Get token from authorization header
    const token = req.headers.authorization?.split(' ')[1];  // Assuming token is sent as 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const verifiedToken = await verifyToken(token);

    if (verifiedToken) {
        const { id, status } = req.body;

        const result = await updatePaymentStatusontroller(id, status)

        return res.json({ result })
    } else {
        return res.status(401).json({ message: 'No token provided' });
    }
}



module.exports = {
    getPaymentByFreelancerIddAPI,
    getPaymentByIdAPI,
    getPaymentByBusinessIdAPI,
    getPaymentByAdminIdAPI,
    storePaymentAPI,
    deletePaymentAPI,
    updatePaymentStatusAPI
};