// Käsittelee kutsut kaikkiin määrittelemättömiin reitteihin (eli heittää 404)

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'Unknown endpoint' })
}

module.exports = unknownEndpoint