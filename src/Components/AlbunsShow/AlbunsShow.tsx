import React, { FunctionComponent } from 'react';
import { Photo } from '../../Store/MainStore';

interface Props {
	limit: number;
	photos: Photo[];
	color: string;
}
const AlbunsShow: FunctionComponent<Props> = ({ limit, photos, color }) => {
	const headers = [];
	for (let index = 0; index < limit; index++) {
		headers.push(
			<th key={index} style={{ border: `1px solid ${color}` }}>
				Photo 0{`${index + 1}`}
			</th>,
		);
	}
	const itens = photos.slice(0, limit);
	return (
		<table style={{ border: `1px solid ${color}` }}>
			<thead>
				<tr>
					<th colSpan={limit}>
						<h2>Album ID: {photos[0].albumId}</h2>
					</th>
				</tr>
				<tr>{headers}</tr>
			</thead>
			<tbody>
				<tr>
					{itens.map(photo => (
						<td style={{ border: `1px solid ${color}` }} key={photo.id}>
							<h2>{photo.title}</h2>
							<img src={photo.thumbnailUrl} alt={photo.title} />
						</td>
					))}
				</tr>
			</tbody>
		</table>
	);
};

export default AlbunsShow;
