import React, { useRef, useState, useEffect } from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import faker from 'faker';
import './styles.css';

export default function Home() {
	const [data, setData] = useState([]);
	const [sortData, setSortData] = useState([]);
	const [query, setQuery] = useState('');

	useEffect(() => {
		setData(
			[...Array(10000).keys()].map(key => {
				return {
					id: key,
					name: `${faker.name.firstName()} ${faker.name.lastName()}`,
					jobTitle: faker.name.jobTitle(),
					gender: faker.name.gender(),
					title: faker.name.title(),
					phoneNumber: faker.phone.phoneNumber(),
				};
			})
		);
	}, []);

	useEffect(() => {
		setSortData(data);
	}, [sortData]);

	const handleChange = e => {
		setQuery(e);

		console.log(query);
		handleSort();
	};

	const handleSort = () => {
		let copyData = [...sortData];
		let newData = copyData.filter(data => {
			return (
				data.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				data.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
				data.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
			);
		});
		setData(newData);
	};

	return (
		<div className="container">
			<h1>Rethink Assessment Search filter with React-virtualized</h1>
			<input
				type="text"
				placeholder="Search ..."
				onChange={e => handleChange(e.target.value)}
			/>
			<div style={{ width: '100vh', height: '100vh' }}>
				<AutoSizer>
					{({ width, height }) => (
						<Table
							rowClassName="table-row"
							headerHeight={40}
							width={width}
							height={height}
							rowHeight={40}
							rowCount={data.length}
							rowGetter={({ index }) => data[index]}
						>
							<Column label="Name" dataKey="name" width={250} />
							<Column label="JobTitle" dataKey="jobTitle" width={300} />
							<Column label="Title" dataKey="title" width={300} />
						</Table>
					)}
				</AutoSizer>
			</div>
		</div>
	);
}
