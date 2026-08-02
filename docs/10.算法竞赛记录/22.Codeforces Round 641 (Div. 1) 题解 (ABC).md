---
title: Codeforces Round 641 (Div. 1) 题解 (ABC)
date: 2020-05-13 07:09:00
permalink: /pages/3b14b8/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1349>

## A. Orac and LCM

显然可以对所有质因数都讨论一遍，然后讨论结果乘起来就是答案。

比如说只考虑质因数 $2$，原序列就简化成了 $n$ 个 $2$ 的整数次幂（注意不被 $2$ 整除的都是 $1$），此时只要找到这 $n$ 个数中第 $2$ 小的数就是这种情况的结果了。

当然，质因数个数是 $O(n)$，再 for 一遍就是 $O(n^2)$ 显然会被卡，我们只考虑小于 $\sqrt{200000}$ 的质因数，然后大于 $\sqrt{200000}$ 的质因数（所有 $a_i$ 中这些质因数的指数至多为 $1$）特殊处理，具体看代码吧。

（更：枯了，我的方法又是最麻烦的。）

别人的方法是，求出所有数和（这个数之后所有数的 gcd）的 lcm，然后所有 lcm 求个 gcd，就是答案了。

准确得说是 $\gcd\limits_{i=1}^{n-1}{lcm(a_i,\gcd\limits_{j=i+1}^n a_j)}$。

提供一种证明思路：还是把质因数分开来看待，然后把 $\gcd$ 当成 $\min$，把 $lcm$ 当成 $\max$，因为要求的是次小值，当且仅当 $i$ 和 $j$ 分别指向最小值和次小值（或者反一反）的时候才取到，证毕。

当然这个方法怎么想到的，那就不要问我了/kk。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,a0) memset(a,a0,sizeof(a))
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; typedef long double llf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} template<typename T> T sqr(const T &x){return x*x;} typedef pair<int,int> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
#define int ll
int T=448,n,ans=1;
int a[N];
map<int,int> m;
signed main(){
    cin>>n;
    repeat(i,0,n)
        cin>>a[i];
    repeat(t,2,T){ //T约等于sqrt(200000)
        int MN=INF,mn=INF;
        repeat(i,0,n){
            int p=1;
            while(a[i]%t==0){
                a[i]/=t;
                p*=t;
            }
            if(p<MN){mn=MN; MN=p;}
            else if(p<mn)mn=p;
        }
        if(mn!=INF)ans*=mn;
    }
    //这之后都是大于sqrt(200000)的情况
    repeat(i,0,n)
    if(a[i]>1){
        m[a[i]]++;
    }
    for(auto i:m){
        if(i.second>=n-1)ans*=i.first;
    }
    cout<<ans<<endl;
    return 0;
}
```

## B. Orac and Medians

wa 了 $4$ 发，罚时吃饱，555。其实都是我没考虑全所有情况。

由于数字实际有多大并不需要关心，我们把大于 $k$ 的 $a_i$ 赋值为 $1$，等于的赋值为 $0$，小于的赋值为 $-1$（更：这个方法比较繁琐，如果存在 0，那么 0 其实和 1 是等价的，然后并不需要 6 个引理这么多了）。

然后目标就变成了把所有数搞成 $0$。

引理 1：如果 0 和 0 相邻，我们可以让 0 铺满（显然选择包含两个 0 的长度为 3 的区间，这个区间将会全是 0，不断扩展连续的 0 的边界即可）（比如 `[1,0,0,-1]`，选择区间 `[1,3]` 后变成 `[0,0,0,-1]`，然后选择 `[2,4]` 后变成 `[0,0,0,0]`）。

引理 2：如果 0 和 1 相邻，我们可以制造 0 和 0 相邻（显然选择这两个数后就好了）。

这说明 1 是一个很重要的资源，我们要尝试把 1 变多。

引理 3：如果 1 和 1 相邻，我们可以任意拓展连续 1 的区间（理由同引理 1）。

引理 4：如果连续 3 个为 1,-1,1，可以制造 1 和 1 相邻（显然选择这三个就好了）。

最后两个引理是特殊情况。

引理 5：如果连续 3 个为 0,-1,1，可以制造 0 和 0 相邻。

引理 6：如果连续 3 个为 0,-1,0，可以制造 0 和 0 相邻。

最后一种特殊情况是 $n=1,a_0=0$ 的情况。

理论有了，该怎么做呢？看代码，懒了打字了（不看代码估计也会了吧，逃）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; typedef long double llf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} template<typename T> T sqr(const T &x){return x*x;} typedef pair<int,int> pii;
#define int ll
int T,n,k;
int a[N],ans;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>k; ans=0;
        repeat(i,0,n){
            cin>>a[i];
            a[i]=(a[i]>k)-(a[i]<k);
        }
        repeat(i,0,n-2)
        if(a[i]==1 && a[i+2]==1 && a[i+1]==-1)
            a[i+1]=1;
        repeat(i,0,n-2)
        if(a[i]==1 && a[i+1]==1 && a[i+2]==-1)
            a[i+2]=1;
        repeat_back(i,0,n-2)
        if(a[i]==-1 && a[i+1]==1 && a[i+2]==1)
            a[i]=1;
        repeat(i,0,n-1){
            if(a[i]+a[i+1]==1)
                ans=1;
            if(a[i]==0 && a[i+1]==0)
                ans=1;
        }
        repeat(i,0,n-2){
            if(a[i+1]==-1 && a[i]+a[i+2]==1)
                ans=1;
            if(a[i+1]==-1 && a[i]==0 && a[i+2]==0)
                ans=1;
        }
        if(n==1 && a[0]==0)ans=1;
        cout<<(ans?"yes":"no")<<endl;
    }
    return 0;
}
```

## C. Orac and Game of Life

简单题，~~简单得一批~~。

首先一个方块相邻有同色方块，那么这个方块将一直闪烁。

如果一个方块没有同色方块相邻，那就考虑与闪烁方块的哈密顿距离最小值（因为闪烁可以传递，传递速度为 1），时间过了这个值就开始闪烁了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define fi first
#define se second
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=1010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; typedef long double llf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} template<typename T> T sqr(const T &x){return x*x;} typedef pair<int,int> pii;
int T,n,m,Q;
ll dis[N][N],ans;
string s[N];
queue<pii> q;
const int dn[4][2]={{0,1},{0,-1},{1,0},{-1,0}};
void push0(int x,int y){
    if(dis[x][y]==INF){
        q.push({x,y});
        dis[x][y]=0;
    }
}
signed main(){
    cin>>n>>m>>Q;
    repeat(i,0,n)cin>>s[i];
    repeat(i,0,n)repeat(j,0,m)dis[i][j]=INF;
    repeat(i,0,n)
    repeat(j,0,m){
        if(i!=n-1 && s[i][j]==s[i+1][j])
            push0(i,j),push0(i+1,j);
        if(j!=m-1 && s[i][j]==s[i][j+1])
            push0(i,j),push0(i,j+1);
    }
    while(!q.empty()){
        int x=q.front().fi,y=q.front().se;
        q.pop();
        repeat(i,0,4){
            int px=x+dn[i][0],py=y+dn[i][1];
            if(px>=0 && py>=0 && px<n && py<m)
            if(dis[px][py]==INF){
                dis[px][py]=dis[x][y]+1;
                q.push({px,py});
            }
        }
    }
    repeat(i,0,Q){
        ll x,y,p;
        cin>>x>>y>>p;
        x--,y--;
        if(p<=dis[x][y])
            cout<<s[x][y]<<endl;
        else
            cout<<char(s[x][y]^((p-dis[x][y])%2))<<endl;
    }
    return 0;
}
```
