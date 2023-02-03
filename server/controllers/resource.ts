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

		const image =
			req.file ? req.file.path :
			undefined;

		const resource = await new Resource({
			name,
			description,
			category,
			url,
			location,
			image
		});

		await resource.save();
		return res.status(201).json({ resource });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const getResources = async (req: any, res: Response) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;
		const resources = await Resource.find().skip(skip).limit(limit).sort({ createdAt: -1 });
		res.json(resources);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};

export const searchResource = async (req: any, res: Response) => {
	try {
		const page = req.query.page || 1;
		const limit = req.query.limit || 10;
		const skip = (page - 1) * limit;
		const searchQuery = req.params.query;
		const resources = await Resource.find({
			$or:
				[
					{ name: { $regex: searchQuery, $options: 'i' } },
					{ description: { $regex: searchQuery, $options: 'i' } },
					{ location: { $regex: searchQuery, $options: 'i' } },
					{ category: { $regex: searchQuery, $options: 'i' } }
				]
		})
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		res.json(resources);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong!' });
	}
};
