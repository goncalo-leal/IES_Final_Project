import SessionManager from "./session.js";


var logged_in = SessionManager.get("session") !== null;
var role = null;
var store_id = null;
if (logged_in) {
    role = SessionManager.get("session").user.authority;
    if (role == "ROLE_STORE_MANAGER") {
        store_id = SessionManager.get("session").store.id;
    }
}

class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                    </li>
                </ul>
    
            <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" data-widget="fullscreen" href="login.html" role="button" id="loginBttn">
                        ${logged_in
                            ? 'Logout'
                            : 'Login'
                        }
                        </a>
                    </li>
                </ul>
            </nav>
        `

        $("#loginBttn").click(function() {
            if (logged_in) {
                SessionManager.set("session", null)
                SessionManager.set("shopping", null)
                window.location.href = 'index.html'
            }
            else {
                window.location.href = 'login.html'
            }
        })
    }
}

class NavbarIndex extends HTMLElement {
    connectedCallback() {
        if (logged_in) {
            this.innerHTML = `
                <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <!-- Left navbar links -->
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                        </li>
                    </ul>
        
                <!-- Right navbar links -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" data-widget="fullscreen" href="login.html" role="button" id="loginBttn">
                            ${logged_in
                                ? 'Logout'
                                : 'Login'
                            }
                            </a>
                        </li>
                    </ul>
                </nav>
                <aside class="main-sidebar sidebar-dark-primary elevation-4">
                    <!-- Brand Logo -->
                    ${ logged_in
                        
                        
                        ? `
                            ${ role == "ROLE_STORE_MANAGER"
                                ? ` <a href="/store.html?id=${store_id}" class="brand-link text-center"> `
                                : ' <a href="/index.html" class="brand-link text-center"> '
                            }
                        `
        
        
                        : ' <a href="/index.html" class="brand-link text-center">'
                    }
                        <span class="brand-text font-weight-bold">ShopAholytics</span>
                    </a>
                
                    <!-- Sidebar -->
                    <div class="sidebar">
                        ${ logged_in
                            ? `
                            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                                <div class="info">
                                    <a id="sm_name" class="d-block"></a>
                                </div>
                            </div>
                            `
                            :''
                        }
                        <nav class="mt-2">
                        ${logged_in
                            ? `<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                <!-- Add icons to the links using the .nav-icon class
                                    with font-awesome or any other icon font library -->
                                <li class="nav-item">
                                ${role == "ROLE_STORE_MANAGER"
                                    ? `<a href="/store.html?id=${store_id}" class="nav-link">`
                                    : '<a href="/home.html" class="nav-link">'
                                }
                                        <i class="nav-icon fa fa-circle"></i>
                                        <p>
                                            Home
                                        </p>
                                    </a>
                                </li>
                                <li class="nav-item">
                                ${role == "ROLE_STORE_MANAGER"
                                    ? `<a href="/store_statistics.html?id=${store_id}" class="nav-link">`
                                    : '<a href="/statistics.html" class="nav-link">'
                                }
                                        <i class="nav-icon fa fa-circle"></i>
                                        <p>
                                            Statistics
                                        </p>
                                    </a>
                                </li>
                                ${role == "ROLE_SHOPPING_MANAGER"
                                    ? ` <li class="nav-item" id="menu-toggle">
                                        <a href="#" class="nav-link">
                                            <i class="nav-icon fa fa-circle"></i>
                                            <p>
                                                Management
                                                <i class="fas fa-angle-left right"></i>
                                            </p>
                                        </a>
                                        <ul class="nav nav-treeview">
                                            <li class="nav-item">
                                                <a href="/user_management.html" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Manage Users</p>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="/add_user.html" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Invite Managers</p>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="/store_management.html" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Manage Stores</p>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="/add_store.html" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Add Store</p>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="/park_management.html" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Manage Parks</p>
                                                </a>
                                            </li>
                                            <li class="nav-item">
                                                <a href="/add_park.html" class="nav-link">
                                                    <i class="far fa-circle nav-icon"></i>
                                                    <p>Add Park</p>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    `
                                    : ''
                                }
                            </ul>
                            `
                            : ``
                        }
                        </nav>
                        <!-- /.sidebar-menu -->
                        <div class="fixed-bottom">
                            <ul class="nav nav-pills nav-sidebar flex-column">
                                <!-- Add icons to the links using the .nav-icon class
                                    with font-awesome or any other icon font library -->
                                <li class="nav-item">
                                    <a href="/account_settings.html" class="nav-link">
                                        <i class="nav-icon fa fa-cog"></i>
                                        <p>
                                            Account Settings
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- /.sidebar -->
                </aside>
            `

            this.update_sidebar_user_info();
            this.update_sidebar_selected_item();
            this.update_body_class();

            $("#loginBttn").click(function() {
                if (logged_in) {
                    SessionManager.set("shopping", null)
                    SessionManager.set("session", null)
                    window.location.href = 'index.html'
                }
                else {
                    window.location.href = 'login.html'
                }
            })
        }
        else {
            this.innerHTML = `
                <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <!-- Left navbar links -->
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <span class="ml-4 brand-text font-weight-bold">ShopAholytics</span>
                        </li>
                    </ul>
        
                <!-- Right navbar links -->
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" data-widget="fullscreen" href="login.html" role="button" id="loginBttn">
                            ${logged_in
                                ? 'Logout'
                                : 'Login'
                            }
                            </a>
                        </li>
                    </ul>
                </nav>
            `

            $("#loginBttn").click(function() {
                if (logged_in) {
                    SessionManager.set("session", null)
                } 
                window.location.href = 'login.html'
            })
        }
    }

    update_sidebar_user_info() {
        if (logged_in) {
            $("#sm_name").text(SessionManager.get("session").user.name);
          }
    }

    update_sidebar_selected_item() {
        var page = window.location.pathname;
        if (["/add_store.html", "/store_management.html", "/add_user.html", "/user_management.html", "/add_park.html"].includes(page)) {
            $("#menu-toggle").addClass("menu-open");
            $(`a[href="#"]`).addClass("active");
        }
  
        $(`a[href="${page}"]`).addClass("active");
    }

    update_body_class() {
        $("body").removeClass("layout-top-nav");
        $("body").addClass("sidebar-mini");
    }
}

class SideBar extends HTMLElement {
    connectedCallback() {
        this.innerHTML =`
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            ${ logged_in
                
                
                ? `
                    ${ role == "ROLE_STORE_MANAGER"
                        ? ` <a href="/store.html?id=${store_id}" class="brand-link text-center"> `
                        : ' <a href="/index.html" class="brand-link text-center"> '
                    }
                `


                : ' <a href="/index.html" class="brand-link text-center">'
            }
                <span class="brand-text font-weight-bold">ShopAholytics</span>
            </a>
        
            <!-- Sidebar -->
            <div class="sidebar">
                ${ logged_in
                    ? `
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="info">
                            <a id="sm_name" class="d-block"></a>
                        </div>
                    </div>
                    `
                    :''
                }
                <nav class="mt-2">
                ${logged_in
                    ? `<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library -->
                        <li class="nav-item">
                        ${role == "ROLE_STORE_MANAGER"
                            ? `<a href="/store.html?id=${store_id}" class="nav-link">`
                            : '<a href="/home.html" class="nav-link">'
                        }
                                <i class="nav-icon fa fa-circle"></i>
                                <p>
                                    Home
                                </p>
                            </a>
                        </li>
                        <li class="nav-item">
                        ${role == "ROLE_STORE_MANAGER"
                            ? `<a href="/store_statistics.html?id=${store_id}" class="nav-link">`
                            : '<a href="/statistics.html" class="nav-link">'
                        }
                                <i class="nav-icon fa fa-circle"></i>
                                <p>
                                    Statistics
                                </p>
                            </a>
                        </li>
                        ${role == "ROLE_SHOPPING_MANAGER"
                            ? ` <li class="nav-item" id="menu-toggle">
                                <a href="#" class="nav-link">
                                    <i class="nav-icon fa fa-circle"></i>
                                    <p>
                                        Management
                                        <i class="fas fa-angle-left right"></i>
                                    </p>
                                </a>
                                <ul class="nav nav-treeview">
                                    <li class="nav-item">
                                        <a href="/user_management.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage Users</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/add_user.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Invite Managers</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/store_management.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage Stores</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/add_store.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add Store</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/park_management.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage Parks</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/add_park.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add Park</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/sensors_management.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Manage Sensors</p>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="/add_sensor.html" class="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>Add Sensor</p>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            `
                            : ''
                        }
                    </ul>
                    `
                    : ``
                }
                </nav>
                <!-- /.sidebar-menu -->
                <div class="fixed-bottom">
                    <ul class="nav nav-pills nav-sidebar flex-column">
                        <!-- Add icons to the links using the .nav-icon class
                            with font-awesome or any other icon font library -->
                        <li class="nav-item">
                            <a href="/account_settings.html" class="nav-link">
                                <i class="nav-icon fa fa-cog"></i>
                                <p>
                                    Account Settings
                                </p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- /.sidebar -->
        </aside>
      `


      this.update_sidebar_user_info();
      this.update_sidebar_selected_item();

    }

    update_sidebar_user_info() {
        if (logged_in) {
            $("#sm_name").text(SessionManager.get("session").user.name);
          }
    }

    update_sidebar_selected_item() {
        var page = window.location.pathname;
        if (["/add_store.html", "/store_management.html", "/add_user.html", "/user_management.html", "/add_park.html"].includes(page)) {
            $("#menu-toggle").addClass("menu-open");
            $(`a[href="#"]`).addClass("active");
        }
  
        $(`a[href="${page}"]`).addClass("active");
    }
}

class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <footer class="main-footer">
            <strong>ShopAholytics &copy; 2021 <a href="https://github.com/goncalo-leal/IES_52"><i class="fab fa-github"></i></a>.</strong>
                All rights reserved.
            <div class="float-right d-none d-sm-inline-block">
                <b>Version</b> 1.0 | <b>Iteration</b> 3
            </div>
        </footer>
        `
    }
}

customElements.define('main-nav', Navbar)
customElements.define('index-nav', NavbarIndex)
customElements.define('side-nav', SideBar)
customElements.define('main-foot', Footer)