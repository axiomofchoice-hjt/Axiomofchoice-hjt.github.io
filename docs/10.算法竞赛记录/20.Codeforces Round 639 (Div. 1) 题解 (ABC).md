---
title: Codeforces Round 639 (Div. 1) 题解 (ABC)
date: 2020-05-07 08:41:00
permalink: /pages/da584e/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1344>

cf 排长队，我题解写完了告诉我 wa，先咕一会。

## A. Hilbert's Hotel

希尔伯特旅馆是一个关于集合论的故事，大家可以了解下（~~雾~~）。

直接按题意来安排 $0..(n-1)$ 号旅客的房间，判断在模 $n$ 意义下是否铺满了 $0..(n-1)$。

感觉证明挺显然的，略了（~~这么显然的肯定不会证~~）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
int T,a[N],n,f[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        fill(f,f+n,0);
        repeat(i,0,n)
            cin>>a[i];
        repeat(i,0,n)
            f[((i+a[i])%n+n)%n]++;
        bool ans=true;
        repeat(i,0,n)
            if(f[i]!=1)ans=false;
        cout<<(ans?"YES":"NO")<<endl;
    }
    return 0;
}
```

## B. Monopole Magnets

先判断(是否有空行)异或(是否有空列)，如果异或值为真则凉凉。然后判断是否出现 `#...#`（即两个 `#` 中间夹了 `.` 的情况），出现就凉凉。

其他情况就输出联通块个数即可。

补充：为什么(是否有空行)异或(是否有空列)为真就凉凉？因为如果在这个空行（或空列）中放了南极，北极就可以走到这个空行中，那就没了。如果既有空行又有空列，把南极放在空行和空列的公共部分就行了。第二种情况 `#...#` 好理解，不补充了。

补充 2：已 AC，看代码。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
#define vector basic_string
#define fi first
#define se second
#ifndef qwq
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
#endif
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=1010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; typedef long double llf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} template<typename T> T sqr(const T &x){return x*x;} typedef pair<int,int> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
//#define int ll
int T,n,m,r[N],c[N];
string s[N];
struct DSU{ //合并：d[x]=d[y]，查找：d[x]==d[y]
    int a[N*N];
    void init(int n){iota(a,a+n+1,0);}
    int fa(int x){
        return a[x]==x?x:a[x]=fa(a[x]);
    }
    int &operator[](int x){
        return a[fa(x)];
    }
}d;
int f(int x,int y){return x*m+y;}
set<int> M;
signed main(){
    cin>>n>>m;
    repeat(i,0,n)cin>>s[i];
    d.init(n*m);
    repeat(i,0,n)
    repeat(j,0,m)
    if(s[i][j]=='#'){
        r[i]=1; c[j]=1; //记录是否为空行/列
        if(i!=n-1 && s[i+1][j]=='#')
            d[f(i,j)]=d[f(i+1,j)];
        if(j!=m-1 && s[i][j+1]=='#')
            d[f(i,j)]=d[f(i,j+1)]; //并查集合并联通块
    }
    bool flag=true;
    
    int aa=*min_element(r,r+n)==0;
    int bb=*min_element(c,c+m)==0;
    if(aa^bb)flag=false; //异或值为真
    
    repeat(i,0,n){
        int pre=-1;
        repeat(j,0,m)
        if(s[i][j]=='#'){
            if(pre==-1)
                pre=j;
            else{
                if(pre!=j-1)
                    flag=false; //一行中出现#...#
                pre=j;
            }
        }
    }
    repeat(j,0,m){
        int pre=-1;
        repeat(i,0,n)
        if(s[i][j]=='#'){
            if(pre==-1)
                pre=i;
            else{
                if(pre!=i-1)
                    flag=false; //一列中出现#...#
                pre=i;
            }
        }
    }
    
    repeat(i,0,n)
    repeat(j,0,m)
    if(s[i][j]=='#')
        M.insert(d[f(i,j)]); //计算联通块
    if(flag==false)cout<<-1<<endl;
    else cout<<M.size()<<endl;
    return 0;
}
```

## C. Quantifier Question

先判环输出 -1（显然 $a<b,b<c,c<a$ 等情况是不存在的）。

贪心（能任意则任意）。如果 $x_i$ 可以走到 $x_j$ 或者 $x_j$ 可以走到 $x_i$，$(i<j)$，那么 $x_j$ 一定是存在。用这个结论就能开始贪心，for 一遍，如果没有被访问(vis)过则把 i 赋上任意，否则赋上存在，然后把 i 的所有可达和被可达都访问(vis)一遍。

显然每次这么操作会 t，因为一个点会被访问 $O(n)$ 次，复杂度会达到恐怖的 $O(n^2)$，我们考虑设两个 vis 数组，一个是在原图上的 `vis_a`，一个是反图上的 `vis_b`，如果跑原图时 `vis_a` 被访问就不继续访问，反图亦然，这样复杂度就是 $O(n)$ 了。

简单题（吧）（大雾）官方题解我还没看，反正 AC 了(doge)。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
#define vector basic_string
#define fi first
#define se second
#ifndef qwq
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
#endif
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; typedef long double llf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} template<typename T> T sqr(const T &x){return x*x;} typedef pair<int,int> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
//#define int ll
int n,m;
int deg[N];
queue<int> q;
vector<int> a[N],b[N]; //a是原图邻接表，b是反图
char ans[N];
bool vis_a[N],vis_b[N];
void del_a(int x){
    if(vis_a[x])return;
    vis_a[x]=1;
    for(auto p:a[x])
        del_a(p);
}
void del_b(int x){
    if(vis_b[x])return;
    vis_b[x]=1;
    for(auto p:b[x])
        del_b(p);
}
signed main(){
    cin>>n>>m;
    while(m--){
        int x,y; cin>>x>>y; x--,y--;
        a[x]+=y; b[y]+=x;
        deg[y]++;
    }
    repeat(i,0,n)
    if(deg[i]==0)
        q.push(i);
    int cnt=0;
    while(!q.empty()){ //这里是拓扑排序判环
        int x=q.front(); q.pop();
        cnt++;
        for(auto p:a[x])
        if(--deg[p]==0)
            q.push(p);
    }
    if(cnt!=n)cout<<-1<<endl,exit(0);
    int ANS=0;
    repeat(i,0,n){
        if(vis_a[i] || vis_b[i])ans[i]='E';
        else{
            ans[i]='A';
            ANS++;
        }
        del_a(i);
        del_b(i);
    }
    cout<<ANS<<endl<<ans;
    return 0;
}
```
