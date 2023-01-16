import { validateResourceData } from './../validation/validateResourceData';
import Resource, { IResource } from './../models/Resource';
import { Request, Response } from 'express';

export const addResource = async (req: any, res: Response) => {
	try {
		const { name, description, category, url, location } = req.body;
		const message = await validateResourceData(req.body);
		if (message) {
			return res.status(400).json({ message });
		}

		const resource = await new Resource({
			name,
			description,
			category,
			url,
			location
		});

		await resource.save();
		return res.status(201).json({ resource });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
