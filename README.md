### Rethink follow-up

- Files provided are in `_drive`
- The two endpoints are in `src/pages/api/files/list.js` and `src/pages/api/files/read.js`
- To run the project, download zip and run `npm install && npm run dev`
- Please see postman endpoint documentation - [API Doc](https://documenter.getpostman.com/view/10852128/TzCL9oYg)
- After the project is ready, you can go to http://localhost:3000 to play with the GUI, which uses the two endpoint under the hood.
- Or you can send http requst directly:
- List files within a directory - [http://localhost:3000/api/files/list?path_name=/folder1](http://localhost:3000/api/files/list?path_name=/folder1)
- Read a file - [http://localhost:3000/api/files/read?path_name=/folder1/circuit.qasm](http://localhost:3000/api/files/read?path_name=/folder1/circuit.qasm)
- Both endpoint expect a query peremeter "path_name", with the value of a path to directory or a path to a file, with root dir as /
