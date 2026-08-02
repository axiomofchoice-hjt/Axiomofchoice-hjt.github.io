---
title: Educational Codeforces Round 95 (Div. 2) 题解 (ABCD)
date: 2020-09-15 08:34:00
permalink: /pages/77f5f1/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

## A. Buying Torches

大意：初始 1 木棍，操作 1：1 木棍换 `x` 木棍；操作 2：`y` 木棍换 1 煤炭。1 木棍和 1 煤炭合成 1 火把，求合成 `k` 火把至少操作次数。

木棍需要至少 `k+ky` 条，每次操作 1 会多 `x-1` 个木棍，初始 1 木棍，所以操作 1 进行的次数是 `⌈(k+ky-1)/(x-1)⌉`，操作 2 是 `k` 次。

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
void Solve(){
    int x=read(),y=read(),k=read();
    cout<<(k+k*y-1+x-1-1)/(x-1)+k<<endl;
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

## B. Negative Prefixes

大意：给一个序列，可以将某些位置的数字重新排列，令 `k` 为这个序列的前缀和的最后 `k` 个位置都是正数，的 `k` 的最大值。求 `k` 最大时重新排列之后的序列。

把能排列的这些数字 `sort` 一下。

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
int a[N],l[N];
vector<int> v;
void Solve(){
    int n=read(); v.clear();
    repeat(i,0,n)a[i]=read();
    repeat(i,0,n)l[i]=read();
    repeat(i,0,n)if(!l[i])v<<a[i]; //"<<" means push_back
    sort(v.begin(),v.end());
    repeat(i,0,n)if(!l[i])a[i]=v.back(),v.pop_back();
    repeat(i,0,n)cout<<a[i]<<' ';
    cout<<endl;
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

## C. Mortal Kombat Tower

大意：有 `n` 个怪，每个怪要么 0 要么 1。你和你朋友每回合可以杀 1 个或 2 个怪，但是只能按给定顺序清怪。两个玩家轮流操作，你朋友先操作。求你朋友杀的 1 型怪的个数最小值。

`dp`，`dp[i][j]` 表示杀前 `i` 个怪，`j` 号玩家杀的第 `i` 个怪的时候，你朋友杀的 1 型怪个数的最小值。转移方程见代码。

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
int Dp[N][2],(*dp)[2]=Dp+1,a[N];
void Solve(){
    int n=read();
    repeat(i,1,n+1)a[i]=read();
    dp[0][0]=dp[-1][0]=inf;
    repeat(i,1,n+1){
        dp[i][0]=min(dp[i-1][1]+a[i],dp[i-2][1]+a[i]+a[i-1]);
        dp[i][1]=min(dp[i-1][0],dp[i-2][0]);
    }
    cout<<min(dp[n][0],dp[n][1])<<endl;
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

## D. Trash Problem

大意：有一些石子放在 `x` 轴上。把区间 `[l,r]` 的石子合在一起的花费是 `r-l`（和题目不太相同，意思到了就行），动态询问把这些石子合到最多两堆的花费。操作是去掉石子和添加石子。

因为答案刚好就是所有石子位置最大值减最小值减相邻石子的最大间隔，维护最大间隔比较麻烦。

搞一个 `set` 和一个 `multiset`。`set` 表示所有石子的位置，`multiset` 表示所有间隔。添加删除石子时，对 `set` 就直接嗯操作就行了，然后得到 `set` 里这个位置的前驱后继，`multiset` 的修改量就是这个位置和前驱和后继之间的距离。

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
set<int> st; multiset<int> st2;
void output(){
    if(st.size()<=3)cout<<0<<endl;
    else cout<<*++st.rbegin()-*++st.begin()-*++++st2.rbegin()<<endl;
}
void Solve(){
    int n=read(),q=read(); st.clear(); st2.clear();
    st.insert(-INF/2); st.insert(INF/2);
    repeat(i,0,n)st.insert(read());
    for(auto i=st.begin();i!=st.end();i++){
        auto j=next(i);
        if(j!=st.end())st2.insert(*j-*i);
    }
    output();
    while(q--){
        int op=read(),x=read();
        if(op==0){
            auto i=st.lower_bound(x);
            st2.erase(st2.lower_bound(*i-*prev(i)));
            st2.erase(st2.lower_bound(*next(i)-*i));
            st2.insert(*next(i)-*prev(i));
            st.erase(i);
        }
        else{
            if(!st.count(x)){
                auto i=st.insert(x).first;
                st2.erase(st2.lower_bound(*next(i)-*prev(i)));
                st2.insert(*i-*prev(i));
                st2.insert(*next(i)-*i);
            }
        }
        output();
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
