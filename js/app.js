    Vue.component('tasks',{
        template:`
            <section class="todoapp">
                <header class="header">
                    <h1>Tareas</h1>
                    <input v-on:keyup.enter="addTask" v-model="newTask" type="text" class="new-todo" placeholder="Nueva tarea">
                </header>
                <section>
                    <ul class="todo-list">
                        <li class="todo" is="task" v-for= "task in tasks" v-bind:task="task"></li>     
                    </ul>
                </section>
                <footer class="footer" v-show="tasks.length">
                    <span class="todo-count">Completas {{completedTasks}} | Incompletas {{incompletedTasks}}</span>
                </footer>
                
                       
            </section>
            
        `,
        data: function(){
            return{
                newTask: "",
            
                tasks:[
                    {title:"aprender laravel",completed:true},
                    {title:"aprender VueJS", completed:true},
                    {title:"hehexd", completed: false}
                ]
            }
        },
        methods:{
            addTask:function(){
                if(this.newTask.length >3){
                    this.tasks.push({
                        title: this.newTask,
                        completed:false
                    });
                    this.newTask="";
                }
                
                
            },
            
            
            
        },
        computed:{
            completedTasks:function(){
                return this.tasks.filter(function(task){
                    return task.completed;
                }).length;
            },
            incompletedTasks:function(){
                return this.tasks.filter(function(task){
                    return !task.completed;
                }).length;
            }
        },
    });

    Vue.component('task',{
        props:['task'],
        template: `<li v-bind:class="classes">

                <div class="view">
                    <input class="toggle" type="checkbox" v-model="task.completed"/>
                    <label v-text ="task.title" v-on:dblclick="edit()" ></label>
                    <button class="destroy" v-on:click="remove()"></button>
                </div>
                <input class="edit" 
                    v-model="task.title" 
                    v-on:keyup.enter="doneEdit()"
                    @blur="doneEdit"
                    v-on:keyup.esc="cancelEdit()"
                />
            </li>
        `,
        data:function(){
            return {
                editing:false,
                cacheBeforEdit:''
            }
        },
        methods:{
            edit:function(){
                this.cacheBeforEdit = this.task.title;
                this.editing=true;
            },
            doneEdit:function(){
                if(!this.task.title){
                    this.remove();
                }
                this.editing=false;
            },
            cancelEdit:function(){
                this.editing =false;
                this.task.title = this.cacheBeforEdit;
            },
            remove:function(){
                var tasks= this.$parent.tasks;
                tasks.splice(tasks.indexOf(this.task),1);
            }
        },
        computed:{
            
            classes:function(){
                return {completed:this.task.completed, editing:this.editing}
            }
        }
    });
    var app = new Vue({
        el: '#app',
        
        
        
    });