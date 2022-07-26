import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { getApi } from '../api';

const UserDetails = () => {
	const { user } = useSelector((state) => state.user);
	const [userDetails, setUserDetails] = React.useState({});
	const [repos, setRepos] = React.useState([]);
	const [followers, setFollowers] = React.useState([]);
	useEffect(() => {
		if (user?.login) {
			(async () => {
				const details = await getApi(user.url);
				setUserDetails(details);
				setRepos(await getRepos());
				setFollowers(await getFollowers());
			})();
		} else {
			setUserDetails({});
			setRepos([]);
			setFollowers([]);
		}
	}, [user]);

	const getRepos = async () => {
		const repos = await getApi(user.repos_url);
		return repos?.length > 0 ? (
			repos?.map((repo) => {
				return (
					<p>
						<a key={repo.id} href={repo.url} target='blank'>
							{repo.name}
						</a>
					</p>
				);
			})
		) : (
			<span>No Followers</span>
		);
	};

	const getFollowers = async () => {
		const repos = await getApi(user.followers_url);
		debugger;
		return repos?.length > 0 ? (
			repos?.map((flo) => {
				return (
					<p>
						<a key={flo.id} href={flo.url} target='blank'>
							{flo.login}
						</a>
					</p>
				);
			})
		) : (
			<span>No repos found</span>
		);
	};
	return userDetails.id ? (
		<div className={styles.userContainer}>
			<img
				className={styles.userImage}
				src={userDetails.avatar_url}
				alt='user'
			/>
			<h2 className={styles.userName}>
				{userDetails.name || userDetails.login}
			</h2>
			<h3>Organisation: {userDetails.company}</h3>
			<p className={styles.userBio}>{userDetails.bio}</p>
			<div className={styles.info}>
				<div>
					<h4>Repositories({userDetails.public_repos})</h4>
					{repos?.length > 0 && repos}
				</div>
				<div>
					<h4>Following({userDetails.following})</h4>
					<h4>Followers({userDetails.followers})</h4>
					{followers?.length > 0 && followers}
				</div>
			</div>
		</div>
	) : (
		<span></span>
	);
};

export default UserDetails;
