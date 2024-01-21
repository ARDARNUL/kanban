Vue.component("kanban",{
    template:`
        <div class="kanban">
        
        <button>add</button>

        <ul id="columns">
        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>

        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>

        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>

        <li class="column">
        <ul>
        <li></li>
        </ul>
        </li>
        </ul>
        </div>
        
    `,

    data(){
        return{
            column1:[],
            column2:[],
            column3:[],
            column4:[],

            saveColumns:[],
            cards:[],

            id: 0,
            name:[],
            text:[],

            dateCreate: new Date(),
            deadlin:null,
            dedline: [],

            year: null,
            month: null,
            day: null,  

        }
    }
});

Vue.component("addCart",{
    template: `
    <div>
        <form>
            <label>Title</label><input>

            <label>label</label><input>

            <input>

            <button>Create</button>
        <form>
    </div>
    `
})


let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});