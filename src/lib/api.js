export const getFileTree = async () => {
	return await fetch("/api/files/list?path_name=/").then(res => res.json());
};

export const getFile = async pathName => {
	return await fetch(`/api/files/read?path_name=${pathName}`).then(res => res.json());
};
