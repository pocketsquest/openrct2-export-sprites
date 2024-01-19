/*
Use os.homedir() first, because it also looks at the environment variables and looks elsewhere if the variable is not defined

os.platform() is the same as process.platform. Possible values are 'aix', 'darwin', 'freebsd','linux', 'openbsd', 'sunos', and 'win32'.

os.userinfo() https://nodejs.org/api/os.html#osuserinfooptions

Looks like I have:
{
  'process.env': {
    HOMEDRIVE: 'C:',
    HOMEPATH: '\\Users\\storl',
    OneDrive: 'C:\\Users\\storl\\OneDrive',
    ProgramFiles: 'C:\\Program Files',
    'ProgramFiles(x86)': 'C:\\Program Files (x86)',
    ProgramW6432: 'C:\\Program Files',
    SystemDrive: 'C:',
    USERNAME: 'storl',
    USERPROFILE: 'C:\\Users\\storl',
    OS: 'Windows_NT'
  },
  'process.platform': 'win32',
  'os.userInfo()': {
    uid: -1,
    gid: -1,
    username: 'storl',
    homedir: 'C:\\Users\\storl',
    shell: null
  },
  'os.homedir()': 'C:\\Users\\storl'
}
*/