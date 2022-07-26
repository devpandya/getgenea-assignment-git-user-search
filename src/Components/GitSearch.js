import React, { useEffect } from 'react';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getApi } from '../api';

const GitSearch = () => {
	const [users, setUsers] = React.useState([]);
	const [value, setValue] = React.useState('');

	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (value) {
			value !== user.login && searchUsers(value);
		} else {
			setUsers([]);
			dispatch({ type: 'setUser', payload: {} });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value]);

	const searchUsers = async (value) => {
		dispatch({ type: 'setUser', payload: {} });
		const data = await getApi(
			`https://api.github.com/search/users?q=${value}&per_page=7`
		);
		setUsers(data?.items);
	};

	const setUser = (user) => {
		setValue(user.login);
		setUsers([]);
		dispatch({ type: 'setUser', payload: user });
	};

	return (
		<div className={styles.searchContainer}>
			<div className={styles.innerSearchContainer}>
				<label className={styles.searchTitle}>Git-ggle</label>
				<input
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className={styles.searchInput}
					type='text'
					placeholder='Search for a user...'
				/>
				{users?.length > 0 && (
					<div className={styles.options}>
						{users?.map((user) => {
							return (
								<li key={user.login} onClick={() => setUser(user)}>
									{user.login}
								</li>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default GitSearch;
