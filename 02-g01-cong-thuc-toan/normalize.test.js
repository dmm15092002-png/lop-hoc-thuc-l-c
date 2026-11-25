// Bộ chuẩn hóa tham khảo dùng trong kiểm thử G0.1 (chưa phải mã nguồn website)
const katex=require('katex');
function normalizeTex(tex){
  let s=tex.normalize('NFC');
  s=s.replace(/(\d),(\d)/g,'$1{,}$2');                       // 0,5 -> 0{,}5 (không có dấu cách)
  s=s.replace(/\\text\{([^{}]*)\}/g,(m,inner)=>'\\text{'+inner.replace(/[^\x00-\x7F]/g,ch=>`\\char"${ch.codePointAt(0).toString(16).toUpperCase()}`)+'}');
  return s;
}
const cases=[['0,5+1,25=1,75','0{,}5+1{,}25=1{,}75'],['f(1, 2)','f(1, 2)'],['\\text{số hạng}','\\text{s\\char"1ED1 h\\char"1EA1ng}'],
 ['\\text{so\u0302\u0301}'.normalize('NFD'),'\\text{s\\char"1ED1}']];
let ok=0;for(const[i,e]of cases){const o=normalizeTex(i);const pass=o===e;let render='';try{katex.renderToString(o,{throwOnError:true,strict:'ignore'});render='render OK'}catch(x){render='render ERR'}
 console.log(pass?'PASS':'FAIL',JSON.stringify(i),'->',JSON.stringify(o),render);ok+=pass}
console.log(ok+'/'+cases.length);
