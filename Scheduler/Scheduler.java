
import java.util.*;
public class Scheduler {
static int counter = 0;	
static boolean[] a = new boolean[144];
static boolean[] b = new boolean[144];
static boolean[] c = new boolean[144];
static int k1 =1;static int k2 = 1;

static void and(){
for(int i =0;i<144;i++) {
	c[i]=a[i]&&b[i];
}	
}
static boolean check(int i,int count) {
  if(c[i] && count < counter)
	  return check(++i,++count);
  else if(c[i] && count == counter)
      return true;
  else
	  return false;
}
static int free_time() {
 for(int i = 0;i<144;i++) {
	 int count =1;
  if(check(i,count))
	  return i;
}
 return -1;
}
static int[] correct_time(int index,int og1,int og2) {                    // og-> time zone k -> 012 present day past future
	int sum1 =0,sum2 = 0;
	int[] arr = new int[2];
	if(index>=0 && index<48) {
		k1=0;k2 = 0;
		sum1 = index+og1;
		sum2 = index+og2;
		if(sum1>48) {
			sum1 = sum1-48;
			k1 = 1; 
		}
		if(sum2>48) {
			sum2 = sum2-48;
			k2 = 1; 
		}
		
	}
	if(index>=48 && index<96) {
		k1=1;k2 = 1;
		sum1 = (index-48)+og1;
		sum2 = (index-48)+og2;
		if(sum1>48) {
			sum1 = sum1-48;
			k1 = 2; 
		}
		if(sum2>48) {
			sum2 = sum2-48;
			k2 = 2; 
		}
	}
	if(index>=96 && index<144) {
		k1=2;k2 = 2;
		sum1 = (index-96)+og1;
		sum2 = (index-96)+og2;	
	}
	arr[0]=sum1;
	arr[1] = sum2;
	return arr;
	//here the value will never be over 48 as thats gmt night so no working hrs
	/*if(i==-1 || i>=144) {
		return*/     		
}


public static void main(String[] args) {
int[] m = new int[2];
int nday=0;int r = 1;
List<String> al=new ArrayList<String>();
al.add("Monday");  
al.add("Tuesday");  
al.add("Wednesday");  
al.add("Thursday");
al.add("Friday");  
al.add("Saturday");  
al.add("Sunday");      
Scanner sc = new Scanner(System.in);
System.out.println("Enter present day 0 ->Mon 1->Tue 2->Wed ....  ");
int day = sc.nextInt();
System.out.println("Enter the Candidate time zone ahead of GMT with sign");
float og1 = sc.nextFloat();int og3 = (int)(og1*2);
System.out.println("Enter the Evaluator time zone ahead of GMT");
float og2 = sc.nextFloat();int og4 = (int)(og2*2);
System.out.println("Enter duration required");
float time = sc.nextFloat();
counter = (int)(time*2);
System.out.println("counter"+counter);
System.out.println("Enter free hrs(as 5:30 as 5.5) in of candidate press 0 to exit");
while(r!=0){
 float k = sc.nextFloat();
 r = (int)(k*2);
 int at = r-og3+48;
 System.out.println("at"+at);
 a[at]=true;
 }
r=1;
System.out.println("Enter free hrs(as 5:30 as 5.5) in of recruiter press 0 to exit");
while(r!=0){
 float k = sc.nextFloat();
 r = (int)(k*2);
 int at = r-og4+48;
 System.out.println("at"+at);
 b[at]=true;
 }
and();
int l = free_time();
if(l == -1)
System.out.println("No free time available");
else{
m = correct_time(l,og3,og4);
float m1 = (float)(m[0]/2);
float m2 = (float)(m[1]/2);
System.out.print("Candidate time & day:\t");
if(k1==0){
nday = day-1;
if(nday < 0 )
    nday =6;
}
if(k1==1){
nday = day;
}
if(k1==2){
nday = day+1;
if(nday >6 )
    nday =0;
}
System.out.println(m1+" "+al.get(nday));
System.out.print("Candidate time & day:\t");
System.out.print("Recruiter time & day:\t");
if(k2==0){
nday = day-1;
if(nday < 0 )
    nday =6;
}
if(k2==1){
nday = day;
}
if(k2==2){
nday = day+1;
if(nday >6 )
    nday =0;
}
System.out.println(m2+" "+al.get(nday));
sc.close();
}	
}
}



