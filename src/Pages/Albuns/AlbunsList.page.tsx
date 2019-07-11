import React, { FunctionComponent } from 'react';
import { Photo } from '../../Store/MainStore';
import { AlbunsShow } from '../../Components';

interface Props {
	albuns: { [id: string]: Photo[] };
	limit: number;
	photosLimit: number;
}

const AlbunsListPage: FunctionComponent<Props> = ({ albuns, limit, photosLimit }) => {
	const albunsId = Object.keys(albuns);
	const realAlbunsLimit = albunsId.length < limit ? albunsId.length : limit;
	const displayAlbuns: Photo[][] = [];
	for (let index = 0; index < realAlbunsLimit; index++) {
		const id = albunsId[index];
		displayAlbuns.push(albuns[id]);
	}

	const colors = ['green', 'blue', 'purple'];
	let index = 2;
	return (
		<>
			{displayAlbuns.map((photos, key) => {
				index++;
				return (
					<div key={key}>
						<AlbunsShow key={key} limit={photosLimit} photos={photos} color={colors[index % 3]} />;
					</div>
				);
			})}
		</>
	);
};
export default AlbunsListPage;
