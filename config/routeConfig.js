/*
 * @Author: JoeLiu 
 * @Date: 2018-06-25 10:42:20 
 * @Last Modified by: JoeLiu
 * @Last Modified time: 2018-07-12 11:57:01
 */

function registorRoutes(app) {
    var requires = [
        {
            root:"/",
            require: '../routes/index'
        }
        ,{
            root:"/upload",
            require: '../routes/upload'
        }
        ,{
            root:"/users",
            require: '../routes/users'
        }
        ,{
            root:"/hospital",
            require: '../routes/hospital'
        }
        ,{
            root:"/doctor",
            require: '../routes/doctor'
        } 
        ,{
            root:"/resource",
            require: '../routes/resource'
        }
        ,{
            root:"/messages",
            require: '../routes/message'
        }
        ,{
            root:"/api",
            require: '../routes/api'
        }
    ];

    requires.forEach(function(item, index) {
        app.use(item.root, require(item.require));
    });
}
module.exports = registorRoutes;