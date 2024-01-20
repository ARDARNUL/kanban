let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {

    },
});

Vue.component("kanban",{
    template:`
        <div class="kanban">
            <ul id="columns">
                <li>
            <ul class="cards">
                <li></li>
            </ul>
            </li>

            <ul id="columns">
                <li>
            <ul class="cards">
                <li></li>
            </ul>
            </li>

            <ul id="columns">
                <li>
            <ul class="cards">
                <li></li>
            </ul>
            </li>

            <ul id="columns">
                <li>
            <ul class="cards">
                <li></li>
            </ul>
            </li>

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

            name:[],
            text:[],

            dateCreate: new Date(),
            dedline: string
        }
    }
})