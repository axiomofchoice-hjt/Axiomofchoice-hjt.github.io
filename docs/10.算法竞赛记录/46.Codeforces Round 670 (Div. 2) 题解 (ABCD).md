---
title: Codeforces Round 670 (Div. 2) 题解 (ABCD)
date: 2020-09-13 09:35:00
permalink: /pages/5b4d5f/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## A. Subset Mex

大意：把原数组分成俩数组 A, B，求（最小的 A 里没出现的自然数 + 最小的 B 里没出现的自然数）的最大值。

答案是最小的出现次数 < 2 的自然数，加上最小的没出现的自然数。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
map<int,int> mp;
void Solve(){
    int n=read(); mp.clear();
    repeat(i,0,n)mp[read()]++;
    int ans=0;
    repeat(i,0,inf)if(mp[i]<2){
        ans+=i;
        break;
    }
    repeat(i,0,inf)if(mp[i]<1){
        ans+=i;
        break;
    }
    cout<<ans<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## B. Maximum Product

大意：求数组中的五个数之积的最大值。

最小的 x 个数和最大的 5 - x 个数之积（x = 0, 1, 2, 3, 4, 5），这六个数取最大值。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
vector<int> a;
void Solve(){
    int n=read(); a.clear();
    repeat(i,0,n)a<<read();
    #define b a.rbegin()
    sort(a.begin(),a.end());
    int ans=max({
        a[0]*a[1]*a[2]*a[3]*a[4],
        a[0]*a[1]*a[2]*a[3]*b[0],
        a[0]*a[1]*a[2]*b[1]*b[0],
        a[0]*a[1]*b[2]*b[1]*b[0],
        a[0]*b[3]*b[2]*b[1]*b[0],
        b[4]*b[3]*b[2]*b[1]*b[0]
    });
    cout<<ans<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## C. Link Cut Centroids

大意：给定一棵树，要求删掉一条边并加上一条边，满足得到的图仍然是一棵树并且重心的个数只有一个。

首先找到其中一个重心 a，然后找到这个重心的重儿子（子树最大的儿子）b，然后找到这个儿子的随便一个儿子 c，去掉 b - c 添加 a - c 即可（特判 b 没有儿子的情况）。

证明：一棵树最多只能有两个重心。如果原来只有一个重心，那么该操作只会增大 b 的最大子树大小，a 显然还是是唯一重心；如果原来有两个重心，那么 b 就是原来另一个重心，该操作会增大 b 的最大子树大小并减小 a 最大子树大小，a 就成为了唯一重心。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
vector<int> a[N]; 
namespace center{
vector<int> rec;
int sz[N],maxx[N];
void dfs(int x,int fa=-1){
    rec<<x;
    sz[x]=1; maxx[x]=0;
    for(auto i:a[x]){
        int p=i;
        if(p!=fa){
            dfs(p,x);
            sz[x]+=sz[p];
            maxx[x]=max(maxx[x],sz[p]);
        }
    }
}
int get(int x){ //get center
    rec.clear(); dfs(x); int n=sz[x],ans=x;
    for(auto x:rec){
        maxx[x]=max(maxx[x],n-sz[x]);
        if(maxx[x]<maxx[ans])ans=x;
    }
    return ans;
}
}using namespace center;
void Solve(){
    int n=read(); repeat(i,1,n+1)a[i].clear();
    repeat(i,0,n-1){
        int x=read(),y=read();
        a[x]<<y; a[y]<<x;
    }
    int c=get(1);
    get(c);
    if(maxx[c]==1){
        cout<<c<<' '<<a[c][0]<<endl;
        cout<<c<<' '<<a[c][0]<<endl;
        return;
    }
    int p1,p2;
    for(auto i:a[c])if(maxx[c]==sz[i])p1=i;
    for(auto i:a[p1])if(c!=i)p2=i;
    cout<<p1<<' '<<p2<<endl;
    cout<<p2<<' '<<c<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

## D. Three Sequences

大意：给定 `ai`，令 `bi` 为单调不减序列，`ci` 为单调不增序列，且 `ai = bi + ci`。对 a 数组区间加操作，询问 `max(b1, b2, ..., bn, c1, c2, ..., cn)` 的最小值。

设 `ai` 的差分数组为 `di`。（具体思路写不了，太难讲了）发现答案只与 `di` 所有正数（或者负数）之和以及 `a1`（或者 `an`）有关。计算可得，令 `a_n = lst`，`sum_{d_i < 0} d_i = dec`，答案就是 `lst + floor((lst + dec) / 2)`（形式不唯一）。维护 `lst` 和 `dec` 都简单的一批。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int a[N],b[N];
void Solve(){
    int n=read();
    repeat(i,1,n+1)a[i]=read();
    int lst=a[n],ans=0;
    auto up=[&](int x,int d=1){
        if(b[x]<0)ans+=d*b[x];
    };
    repeat(i,1,n){
        b[i]=a[i+1]-a[i];
        up(i);
    }
    int q=read();
    cout<<lst-llround((lst+ans)/2.0-0.1)<<endl;
    while(q--){
        int l=read(),r=read(),k=read();
        if(r==n)lst+=k;
        if(l!=1){
            up(l-1,-1);
            b[l-1]+=k;
            up(l-1,1);
        }
        if(r!=n){
            up(r,-1);
            b[r]-=k;
            up(r,1);
        }
        cout<<lst-llround((lst+ans)/2.0-0.1)<<endl;
    }
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; //T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```
