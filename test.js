let prevCount = 0;
let newCount = 0;
const logNumber = 7;
const skipErrors = true;

const objectData = [
  { ImageCount: 5, ObjectName: 'ABC' },
  { ImageCount: 1, ObjectName: 'DEF' },
  { ImageCount: 2, ObjectName: 'ARRSW2' },
  { ImageCount: 10, ObjectName: 'JKL' },
  { ImageCount: 2, ObjectName: 'MNO' },
  { ImageCount: 3, ObjectName: 'ARRX' },
  { ImageCount: 5, ObjectName: 'STU' },
];

const datErrorFiles =  [
  '4X4',
  'ARRSW2']

function testFn(prevCount,newCount) {
  return Math.floor(prevCount / logNumber) < Math.floor(newCount / logNumber) ;

}

objectData.forEach(obj => {
  if ((skipErrors && !datErrorFiles.includes(obj.ObjectName)) || obj.ObjectName !== 'ARRX'){
    console.log(`${obj.ObjectName}: datErrorFiles.includes(obj.ObjectName) = ${datErrorFiles.includes(obj.ObjectName)}`);
    console.log(`${obj.ObjectName}: skipErrors && !datErrorFiles.includes(obj.ObjectName) = ${(skipErrors && !datErrorFiles.includes(obj.ObjectName))}`);
    console.log(`${obj.ObjectName}: obj.ObjectName !== 'ARRX' = ${obj.ObjectName !== 'ARRX'}`);
    console.log(`${obj.ObjectName}: (skipErrors && !datErrorFiles.includes(obj.ObjectName)) || obj.ObjectName !== 'ARRX' = ${(skipErrors && !datErrorFiles.includes(obj.ObjectName)) || obj.ObjectName !== 'ARRX'}`);
  } else {
    console.log(`Skipped ${obj.ObjectName}`)
  }
})