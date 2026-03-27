---
title: Codeforces Round 652 (Div. 2) 题解 (ABCDE)
date: 2020-06-25 01:00:00
permalink: /pages/f9d553/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## A. FashionabLee

大意：判断是否能让正 n 边形，旋转后的某条边与 X 轴平行，某条边与 Y 轴平行。

X 轴和 Y 轴夹角 90°，因此只要有两条边垂直就行了（指 `n%4==0`）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
#define endl "\n"
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
//#define int ll
void Solve(){
    int n=read();
    cout<<(n%4==0?"YES":"NO")<<endl;
}
signed main(){
    for(int T=read();T--;)Solve();
    return 0;
}
```

## B. AccurateLee

大意：输入一个 01 字符串，如果存在子串 "10" 则可以删除这个 1 或者删除这个 0，输出任意操作后的最短子串。如果长度一致则输出字典序最小的那个。

我们知道前导 0 和后导 1 是无法删除的，除了这些之外，想怎么删就怎么删（最后留 "0" 就行）所以输出所有前导 0+"0"+所有前导 1。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
#define endl "\n"
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
//#define int ll
char s[N];
void Solve(){
    int n=read(); scanf("%s",s);
    int l,r;
    for(l=0;l<n;l++)if(s[l]!='0')break;
    for(r=n-1;r>=0;r--)if(s[r]!='1')break;
    repeat(i,0,l)cout<<'0';
    if(l<r)cout<<'0';
    repeat(i,r+1,n)cout<<'1';
    cout<<endl;
}
signed main(){
    for(int T=read();T--;)Solve();
    return 0;
}
```

## C. RationalLee

大意：有 $k$ 个朋友和 $n$ 个数（ $a_1...a_n$ ），将这 $n$ 个数分配到 $k$ 个朋友使得第 i 个朋友拥有 $w_i$ 个数，每个朋友的快乐值是分配到的数字的最小值与最大值之和，求所有分配方案中所有朋友快乐值之和的最大值。

第一步是把 $k$ 个最大的数分配到每个朋友中，这样保证快乐值的最大值那部分最优。然后以此将数字分配给 $w_i$ 最小的，完了后分配给 $w_i$ 第二小的，以此类推，保证快乐值的最小值那部分最优。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
#define endl "\n"
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int a[N],b[N],n,m;
void Solve(){
    n=read(),m=read();
    repeat(i,0,n)a[i]=read();
    repeat(i,0,m)b[i]=read();
    sort(a,a+n); sort(b,b+m);
    int ans=0;
    repeat(i,0,m){
        b[i]--;
        ans+=a[n-1];
        if(b[i]==0)ans+=a[n-1];
        n--;
    }
    repeat(i,0,m)while(b[i]){
        b[i]--;
        if(b[i]==0)ans+=a[n-1];
        n--;
    }
    cout<<ans<<endl;
}
signed main(){
    for(int T=read();T--;)Solve();
    return 0;
}
```

## D. TediousLee

大意：~~求一棵树的鸡爪个数（大雾）~~ 略。

首先，能看得出来这棵树是一个分形结构。level n 的树其实是一个根节点，连接着两个 level n-2 的树和一个 level n-1 的树。因此答案也近似地等于两倍 level n-2 的答案+level n-1 的答案（差别就是根节点所在的鸡爪能不能选择的问题）通过找规律发现，`n%3==0` 的时候根节点鸡爪是可以选的，于是得到递推式。

$$
a_1=0,a_2=0\\
a_n=a_{n-1}+2a_{n-2}+4[n\%3=0]
$$

- 最后官方题解里放了个这玩意 `Challenge : Try solving problem D for n≤1e18. (no matrix-multiplication)` 不用矩快计算 1e18？我稍微算了一下，如果推导通项公式感觉不是不可以，就是有亿点点繁，不知道老铁们有没有更好的方法。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
#define endl "\n"
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=2000010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int ans[N];
void Solve(){
    int n=read(); cout<<ans[n]<<endl;
}
signed main(){
    repeat(i,3,N)ans[i]=(ans[i-1]+2*ans[i-2]+(i%3==0)*4)%mod;
    for(int T=read();T--;)Solve();
    return 0;
}
```

## E. DeadLee

大意：有很多种食物，每种食物有 $w_i$ 份，有很多朋友，每个人喜欢两种食物（每个人不会喜欢相同的两种食物）。如果轮到某个朋友吃了，他会吃他喜欢的两种食物各一份（如果有的话）。如果他没能以上述方式吃到任何食物，他就会吃 Lee。问 Lee 能否存活，能存活还要输出朋友的出场顺序。

这题难就难在需要反着来，就是先让朋友吃完所有食物，然后再进行吃的反操作（~~指吐~~）。

首先令 $s_i$ 为多少朋友喜欢第 i 种食物，让 $w_i-=s_i$。这样 $w_i$ 既有非负数也有负数，非负数表示，喜欢第 i 种食物的朋友再怎么吃也不会把第 i 种食物吃完的，因此这些朋友是安全的，可以留到最后出场。同时，我们可以取消这些安全的朋友的影响，即~~吐出~~他们喜欢的另外一种食物 $w_j++$。这样我们又能找到更多的安全的朋友，不断这么操作即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
#define endl "\n"
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
//mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii;
const int mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int w[N];
vector<int> ans;
vector<pii> e[N];
queue<int> q;
bool vis[N],in_ans[N];
void Solve(){
    int n=read(),m=read();
    repeat(i,0,n)w[i]=read();
    repeat(i,0,m){
        int x=read()-1,y=read()-1;
        e[x].push_back({y,i}); w[x]--;
        e[y].push_back({x,i}); w[y]--;
    }
    repeat(i,0,n)
        if(w[i]>=0)q.push(i),vis[i]=1;
    while(!q.empty()){
        int food=q.front(); q.pop();
        for(auto p:e[food]){
            if(!in_ans[p.se])ans.push_back(p.se),in_ans[p.se]=1;
            if(!vis[p.fi]){
                w[p.fi]++;
                if(w[p.fi]>=0){
                    vis[p.fi]=1;
                    q.push(p.fi);
                }
            }
        }
    }
    if((int)ans.size()==m){
        cout<<"ALIVE"<<endl;
        repeat_back(i,0,ans.size())cout<<ans[i]+1<<' ';
    }
    else cout<<"DEAD"<<endl;
}
signed main(){
    for(int T=1||read();T--;)Solve();
    return 0;
}
```
