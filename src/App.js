import { useState } from "react";
import banner from "./img/banner.png";
import sunflower from "./img/sunflower.png";
import imo from "./img/1.png";

function App() {
  const [term,setTerm]= useState();
  const [sumfi,setSumfi]=useState(0);

  const bi_LRADIX = 1000000000000000;

  function bi_trim0(s) { 
    while (s.charAt(0)=='0' && s.length>1) s=s.substring(1);
    return s;
   }

  function bi_copy_(x,y) {
    var i, xL = x.length, k = Math.min(xL, y.length);
    for (i=0; i<k; i++) x[i]=y[i];
    for (i=k; i<xL;i++) x[i]=0;
   }

  function bi_trimV(x,k) {
    var i,y;
    for (i=x.length; i>0 && !x[i-1]; i--);
    y=new Array(i+k);
    bi_copy_(y,x);
    return y;
   }

  function bi_addU(a1,a2) {
    var L1=a1.length, L2=a2.length, L=Math.max(L1,L2), M=Math.ceil(L/15);
    var i=0, r=[]; r[M]=0;
   
    for (var k=0;k<L;k+=15) {
     r[i] = (a1.substring(L1-k-15,L1-k)-0) + (a2.substring(L2-k-15,L2-k)-0);
     i++;
    }
    for (var i=0;i<M;i++) {
     if (r[i] >= bi_LRADIX) r[i+1] += 1;
     r[i] = (''+(bi_LRADIX+r[i])).substring(1);
    }
    return bi_trim0(r.reverse().join(''));
   }

  let Fn = new Array('0','1','1');

  function fiborun(e){
    e.preventDefault();  

    var n = parseInt(term,10);
    if (isNaN(n) || !isFinite(n) || n<0 || n>50000) return 'Expected 0 \u2264 n \u2264 50000'
    if (n>2 && Fn[n]==null) {
     for (var k=3; k<=n; k++) {
      if (Fn[k]==null) Fn[k] = bi_addU(Fn[k-1],Fn[k-2]);
     }
    }
    return setSumfi(Fn[n]);
   }

  return (
    <div className="App">
      <header>
        <h1>FunFibo</h1>
      </header>
      <section className="banner">
        <img src={banner} alt="fibanner"/>
        <div className="Welcome">
          <h2>Welcome to<br/><span>FunFibo</span></h2>
        </div>
      </section>
      <div className="Fibonacci">
        <h1>Fibonacci Number:</h1>
        <form> 
          <label>Nth term: </label>
          <input 
          type="text"
          value={term}
          onChange={(e)=>setTerm(e.target.value)}
          />
          <button onClick={fiborun}>Check</button>
        </form>
        <label>Sum:<br /></label>
        <textarea value={sumfi} rows="10" cols="50"></textarea>
      </div>
      <main>
        <article>
          <h2>Fibonacci Numbers</h2>
          <p>The Fibonacci Sequence is a peculiar series of numbers from classical mathematics that has found applications in advanced mathematics, nature, statistics, computer science, and Agile Development. The Fibonacci sequence is a series of numbers where a number is the addition of the last two numbers, starting with 0, and 1.</p>
        </article>
        <ul className="images">
          <h2>Fibonacci In Nature</h2>
          <li><img src={imo} alt="im1" /></li>
          <li><img src={sunflower} alt="sunfl" /></li>
        </ul>
      </main>
      <footer>
        <p className="copyright">@Copyright FunFibo</p>
      </footer>
    </div>
  );
}

export default App;
