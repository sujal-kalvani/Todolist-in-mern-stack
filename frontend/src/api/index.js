const backendDomain = "http://localhost:8000"

const SummaryApi = {
    AddTodos: {
        url: `${backendDomain}/api/add-todos`,
        method: "post"
    },

    GetTodos: {
        url: `${backendDomain}/api/get-todos`,
        method: "get"
    },

    EditTodos: {
        url: `${backendDomain}/api/edit-todos`,
        method: 'get'
    },

    UpdateTodos: {
        url: `${backendDomain}/api/update-todos`,
        method: 'put'
    },

    DeleteTodos: {
        url: `${backendDomain}/api/delete-todos`,
        method: 'delete'
    },
    UpdateTodosStatus: {
        url: `${backendDomain}/api/todo/status`, 
        method: 'PUT'
    }

}

export default SummaryApi