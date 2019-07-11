import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/photos';

export interface Photo {
	id: number;
	albumId: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

export const getAlbuns = async () => {
	const photos = await axios.get<Photo[]>(url);
	return photos.data;
};
