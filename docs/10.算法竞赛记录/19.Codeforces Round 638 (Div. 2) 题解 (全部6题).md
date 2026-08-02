---
title: Codeforces Round 638 (Div. 2) 题解 (全部6题)
date: 2020-05-02 09:12:00
permalink: /pages/1d97c3/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1348>

## A. Phoenix and Balance

想了想，还是不略了。

显然有 $2^1+2^2+...+2^{n-1}<2^n$，前 $n-1$ 个数随你选 $\dfrac n 2$ 个一定小于 $2^n$。为了两边硬币质量更靠近，在前 $n-1$ 中要选最大的 $\dfrac n 2$ 个硬币。

求和公式搞一搞。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
signed main(){
    int T; cin>>T;
    while(T--){
        int n; cin>>n;
        #define p(n) (1ll<<(n)) 
        cout<<(p(n/2+1)-2)<<endl;
    }
    return 0;
}
```

## B. Phoenix and Beauty

显然要我们弄出一个周期为 $k$ 个序列。

如果数字种类数大于 $k$ 那一定无解，除此之外，输出 $nk$ 个数，每 $k$ 个数一周期，同时该序列要包含原序列的所有数就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
set<int> s;
void solve(){
    int n,k,x; cin>>n>>k; s.clear();
    repeat(i,0,n)cin>>x,s.insert(x);
    if((int)s.size()>k){cout<<-1<<endl; return;}
    for(int i=1;(int)s.size()<k;i++)s.insert(i);
    cout<<n*k<<endl;
    repeat(i,0,n)
    for(auto j:s)
        cout<<j<<' ';
    cout<<endl;
}
signed main(){
    int T; cin>>T;
    while(T--)solve();
    return 0;
}
```

## C. Phoenix and Distribution

好难啊。

先对读入的字符串 $s$ 排个序，然后分情况讨论。

首先如果最小的字符的个数凑不齐 $k$ 个，那输出第 $k$ 个字符（比如说，`s="aaxxzz",k=4`，显然输出 `"x"` 就行了，比 `"x"` 小的字符串一定包含 `'a'` 但是又不可能）。

（更：原来写的时候删了一个判断条件，结果发现假了，这里要特判一下 $n=k$ 的情况 qwq。）

然后就是重点，我们有两种不同的方法，第一种方法是将答案均摊（第一个字符放第一个，第二个字符放第二个，第 $k+1$ 个字符又放回第一个，依次类推），第二种方法是把前 $k-1$ 个字符放前 $k-1$ 个桶里，剩下的塞到最后一个桶。

这两种方法取个 max 当然再好不过，我用了比较蠢的判定方法，如果先有 $k$ 个相同的字符，剩下的 $n-k$ 个字符也都相同（前 $k$ 个字符 $=A$，后 $n-k$ 个字符 $=B$，当然 $A=B$ 也没事），这时候一定要均摊方法，其他情况用第二种方法。

公式渲染好像有问题，贴个截图。

![img](https://img2020.cnblogs.com/blog/1860292/202005/1860292-20200502144511364-1607698909.png)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
string s;
void solve(){
    int n,k; cin>>n>>k;
    cin>>s; sort(s.begin(),s.end());
    if(s[k-1]!=s[0] || n==k){
        putchar(s[k-1]);
        puts("");
        return;
    }
    if(s[n-1]==s[k]){
        putchar(s[0]);
        repeat(i,0,(n-1)/k)
            putchar(s[k]);
        puts("");
        return;
    }
    puts(s.c_str()+k-1);
}
signed main(){
    int T; cin>>T;
    while(T--)solve();
    return 0;
}
```

## D. Phoenix and Science

一波操作后，发现其实要我们求一个最短的单调不减序列，这个序列的第一个数是 $1$，任意相邻的两个数，后一个不能超过前一个的两倍，并且序列所有数之和为 $n$（解释一下，序列的第 i 个数表示第 i 天的细胞数）。

初步思考可以发现，细胞数要以最快速度增长（指数增长），即 $1,2,4,8...$，如果发现数字之和即将大于 $n$ 就要减缓。但是这么写有点麻烦，一个简单的方法是生成一个长度为 $sz$ 的序列 `a[i]`，前 $sz-1$ 个数满足指数增长，最后一个数等于 $n-\sum\limits_{i=1}^{sz-1}a[i]$，如果 `a[sz]<a[sz-1]`（不符合要求）就要平均一下这两个数，这一步的代码表示为：

```cpp
if(a[sz-1]<a[sz-2]){
    int sum=a[sz-1]+a[sz-2];
    a[sz-2]=sum/2;
    a[sz-1]=(sum+1)/2;
}
```

然后输出 $sz-1$ 和 `a[i]` 的差分数组即可。

公式渲染好像有问题，贴个截图。

![img](https://img2020.cnblogs.com/blog/1860292/202005/1860292-20200502144444684-907482665.png)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
vector<int> a;
void solve(){
    int n; cin>>n; a.clear();
    for(int i=1;;i<<=1){
        if(n<=i){a.push_back(n); break;}
        a.push_back(i);
        n-=i;
    }
    int sz=a.size();
    if(a[sz-1]<a[sz-2]){
        int sum=a[sz-1]+a[sz-2];
        a[sz-2]=sum/2;
        a[sz-1]=(sum+1)/2;
    }
    cout<<sz-1<<endl;
    repeat(i,0,sz-1)
        cout<<a[i+1]-a[i]<<' ';
    cout<<endl;
}
signed main(){
    int T; cin>>T;
    while(T--)solve();
    return 0;
}
```

## E. Phoenix and Berries

假设同色的浆果才能放入同一篮子中，那么答案显然是 $\lfloor\dfrac{\sum a[i]}k\rfloor+\lfloor\dfrac{\sum b[i]}k\rfloor$。

如果同树的浆果也能放同一篮子呢？

智熄地思考后发现，由于 $n,k$ 很小，甚至可以用优化后的 $O(n^3)$ 算法（不优化其实也行），而题目又和（模 $k$ 数）很有关系，我们考虑在模 $k$ 的意义上背包 dp（就是如果只考虑同树的浆果放篮子里，那么我们要 dp 出成功摘下的第一种颜色的浆果个数模 k 的数的所有可能）。

emmm 这段是补充，为什么要算模 $k$？如果我知道了一种可行的（只摘同树的浆果的）摘浆果的方法，即第一种颜色拿了 $t_1k+s_1$ 个，第二种颜色拿了 $t_2k+s_2$ 个（ $s_1,s_2<k$ 且 $s_1+s_2=k$），那么对于这种方法，我们计算 $\lfloor\dfrac{\sum a[i]-s_1}k\rfloor+\lfloor\dfrac{\sum b[i]-s_2}k\rfloor+1$ 并更新答案即可。~~震惊~~，竟然和 $t_1,t_2$ 没关系！这是因为就算考虑了 $t_1,t_2$ 算出来的答案也是一回事，不信可以试试（doge）。

dp 每个状态只有 01 两种可能，显然能用 bitset 优化，复杂度除以 32，美滋滋。

公式渲染好像有问题，贴个截图。

![img](https://img2020.cnblogs.com/blog/1860292/202005/1860292-20200502143526269-1999761247.png)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=510; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
#define int ll
int a[N],b[N],k;
bitset<N*2> dp,dp2;
void push(int l,int r){
    if(l>r)return;
    dp2=0;
    repeat(i,l,r+1)
        dp2|=dp<<i;
    dp|=dp2;
    dp|=dp>>k;
}
void solve(){
    int n,sa=0,sb=0,ans=0;
    cin>>n>>k;
    repeat(i,0,n)cin>>a[i]>>b[i],sa+=a[i],sb+=b[i];
    dp=1;
    repeat(i,0,n){
        push(max(1ll,k-b[i]),min(k-1,a[i]));
    }
    ans=sa/k+sb/k;
    repeat(i,0,k+1)
    if(dp[i]){
        int j=k-i;
        if(sa>=i && sb>=j)
            ans=max(ans,(sa-i)/k+(sb-j)/k+1);
    }
    cout<<ans<<endl;
}
signed main(){
    int T=1; //cin>>T;
    while(T--)solve();
    return 0;
}
```

## F. Phoenix and Memory

官方题解说有好多好多解法，我思来想去~~寝食难安~~也只理解了一种解法（线段树解法）~~我好菜啊~~。

首先可以用贪心+优先队列跑出第一种排列方法。`for i=1..n`，让所有左端点为 i 的入队，让右端点最小的一个出队（一个就够了）并记录至答案。

第二种排列方法难很多，官方题解过于简洁所以我自己推了一遍。首先要明确一个概念就是，一定一定存在这样的合法的排列方法，它和第一种排列方法相比只交换了两个元素（这是区间的~~玄学~~性质，莫得证明）。

为了方便讨论我们让每个区间储存一下答案（`X.mid`），还有 `X.l`,`X.r` 分别表示区间左端点和右端点。因此根据上面莫得证明的概念，我们的任务是找到两个区间 $X,Y$ 满足关系一：$X.l\le Y.mid\le X.r$，关系二：$Y.l\le X.mid\le Y.r$，然后交换它们即可。

首先固定一个区间 $X$。我们要找满足两个关系的区间，~~这太复杂了~~，~~简单一点~~，不如先找到所有满足第二个关系的区间的集合（即 $\{Y|Y.l\le X.mid\le Y.r\}$）。如果我们的 `X.mid` 递增，维护这样的集合还是挺容易的（也是优先队列就能维护了）。那么对于前一个关系（$X.l\le Y.mid\le X.r$），其实就是维护 $\{Y.mid\}$ 这个集合，然后判断是否有元素落在区间 $X$ 中，马上联想到线段树。在维护集合 $\{Y|Y.l\le X.mid\le Y.r\}$ 的同时也维护一个线段树 `tr`，其中 `tr[i]=` 多少个 $Y$ 满足 `Y.mid=i`。

最后，因为单点修改区间维护所以我用了 zkw 线段树。

公式渲染好像有问题，贴个截图 /kk。

![img](https://img2020.cnblogs.com/blog/1860292/202005/1860292-20200503003654210-753701174.png)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef pair<int,int> pii;
struct seg{
    #define U(a,b) (a+b) //查询操作
    ll a0=0; //查询操作的零元
    int n; ll a[1024*1024*4*2]; //内存等于2^k且大于等于两倍inn
    void init(int inn){ //建树
        for(n=1;n<inn;n<<=1);
        repeat(i,0,n)a[n+i]=0;
        repeat_back(i,1,n)up(i);
    }
    void up(int x){
        a[x]=U(a[x<<1],a[(x<<1)^1]);
    }
    void update(int x,ll k){ //位置x加上k
        a[x+=n]+=k; //也可以赋值等操作
        while(x>>=1)up(x);
    }
    ll query(int l,int r){ //区间查询
        ll ans=a0;
        for(l+=n-1,r+=n+1;l^r^1;l>>=1,r>>=1){
            if(~l & 1)ans=U(ans,a[l^1]); //l^1其实是l+1
            if(r & 1)ans=U(ans,a[r^1]); //r^1其实是r-1
        }
        return ans;
    }
}tr;
struct node{
    int l,r,m,rawp,p;
}a[N];
struct op{bool operator()(const node &a,const node &b){return -a.r<-b.r;}};
priority_queue<node,vector<node>,op> q;
int n,ans[N],pos[N],r,rr;
void output(){
    repeat(i,0,n)cout<<ans[i]+1<<' ';
    cout<<endl;
}
void get_first_ans(){
    int ptr=0;
    repeat(i,0,n){
        while(ptr<n && a[ptr].l==i)
            q.push(a[ptr++]);
        a[q.top().p].m=i; ans[q.top().rawp]=i; pos[i]=q.top().p; q.pop();
    }
}
bool get_second_ans(){
    int ptr=0;
    repeat(i,0,n){
        int x=pos[i];
        while(ptr<n && a[ptr].l==i){
            tr.update(a[ptr].m,1);
            q.push(a[ptr++]);
        }
        while(!q.empty() && a[q.top().p].r<a[x].m){
            tr.update(a[q.top().p].m,-1);
            q.pop();
        }
        if(tr.query(a[x].l,a[x].r)>=2){
            r=x;
            #define inc(a,b,c) (a<=b && b<=c)
            repeat(j,0,n)
            if(j!=r)
            if(inc(a[j].l,a[r].m,a[j].r) && inc(a[r].l,a[j].m,a[r].r)){
                rr=j;
                return true;
            }
            cout<<"wcynb"<<endl; return false; //这样我可以在评测记录中知道程序运行到了不该运行的地方
        }
    }
    return false;
}
signed main(){
    n=read(); tr.init(n+1);
    repeat(i,0,n){
        a[i].l=read()-1;
        a[i].r=read()-1;
        a[i].rawp=i;
    }
    sort(a,a+n,[](const node &a,const node &b){
        return a.l<b.l;
    });
    repeat(i,0,n)a[i].p=i;
    get_first_ans();
    if(get_second_ans()){
        cout<<"NO"<<endl;
        output();
        swap(ans[a[r].rawp],ans[a[rr].rawp]);
        output();
    }
    else{
        cout<<"YES"<<endl;
        output();
    }
    return 0;
}
```
