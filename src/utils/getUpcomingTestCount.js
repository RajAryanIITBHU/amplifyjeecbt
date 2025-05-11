export async function getUpcomingTestCount(papers) {
  const now = new Date();

  let c =0;
  papers.map((p,i)=>{
    if(new Date(p.start) > now){
      c+=1;
    }
  })

  return c

}
