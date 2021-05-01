# **fnf-express**
### fnf-express a short form of the name fast and furious express. Its a tool that helps in making the development of **node js** and **express** base application very fast, thorugh a customised CLI-commands
<br />
<br />
<h3>fnf-express follows the MVC architecture in, but <b>not</b> strictly. Therefore, anyone can change the structure to suit what they want at the end. It automatically generates</h3>
<ul>
<li><h3><b>Models</b></h3></li>
<li><h3><b>Routes</b></h3></li>
<li><h3><b>Controllers</b></h3></li>
<li><h3><b>Public</b></h3></li>
<li><h3><b>Views</b></h3></li>
</ul>

# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g fnf-express
```

And nodemon will be installed globally to your system path.

You can also install fnf-express as a development dependency:

```bash
npm install --save-dev fnf-express
```

For CLI options, use the `-h` (or `--help`) argument:

```bash
fnf-express -h
```


### - This commands ask various questions which is used to generate the various templates
```bash
fnf-express 
```

### - This commands is used to create a models file in the **models** directory in the root of your project (`-m` or `--models`).
```bash
fnf-express -m <model_file_name>
```

### - This commands is used to create a controller file in the **controllers** directory in the root of your project (`-c` or `--controllers`)
```bash
fnf-express -c <controller_file_name>
```

### - This commands is used to create a route file in the **routes** directory in the root of your project (`-r` or `--routes`)
```bash
fnf-express -r <router_file_name>
```