import React, { FunctionComponent, useState, useEffect } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { AlbunsListPage, AlbunsPage } from '../Pages';

import { getAlbuns, Photo } from '../Store/MainStore';

import { chain } from 'lodash';

interface Props {}
const MainRoute: FunctionComponent<Props> = () => {
	const [albuns, setAlbuns] = useState<{ [id: string]: Photo[] } | null>(null);
	useEffect(() => {
		getAlbuns()
			.then(photos => {
				const albunsWithPhotos: { [id: string]: Photo[] } = chain(photos)
					.orderBy(photo => photo.albumId)
					.reduce(
						(currentAlbuns: { [id: string]: Photo[] }, photo) => {
							if (!currentAlbuns[`${photo.albumId}`]) {
								currentAlbuns[`${photo.albumId}`] = [];
							}
							currentAlbuns[`${photo.albumId}`].push(photo);
							return currentAlbuns;
						},
						{} as any,
					)
					.map((albunPhotos, id) => {
						return {
							id,
							photos: chain(albunPhotos)
								.orderBy(photo => photo.id)
								.value(),
						};
					})
					.reduce(
						(finalAlbun: { [id: string]: Photo[] }, albunOrdered) => {
							finalAlbun[albunOrdered.id] = albunOrdered.photos;
							return finalAlbun;
						},
						{} as any,
					)
					.value();
				setAlbuns(albunsWithPhotos);
			})
			.catch(err => {
				console.log({ err });
				setAlbuns(null);
			});
	}, []);
	if (!albuns) {
		return <>Loading</>;
	}
	return (
		<Switch>
			<Route
				path={'/'}
				exact
				render={props => {
					return <AlbunsListPage albuns={albuns} limit={3} photosLimit={2} />;
				}}
			/>
			<Route path={'/:id'} exact component={AlbunsPage} />
			<Redirect to={'/'} />
		</Switch>
	);
};

export default MainRoute;
