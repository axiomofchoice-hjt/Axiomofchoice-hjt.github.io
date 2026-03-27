---
title: Codeforces Round 655 (Div. 2) 题解 (ABCD)
date: 2020-07-12 09:14:00
permalink: /pages/58e2c6/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

又一次测评姬事故现场。

## A. Omkar and Completion

就。。全 1 挺好的。

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
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=61; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<int,int> pii;
const int mod=(999983); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
void Solve(){
    int n=read();
    repeat(i,0,n)cout<<"1 ";
    cout<<endl; 
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## B. Omkar and Last Class of Math

~~HOW TO 快速切题？那就写几个例子找规律然后就秒切了。~~

结论是 `a = n` 的最大的不等于 `n` 的约数，以下是证明：

假设 `a <= b`，那么显然 `lcm` 一定 `>= b`。这里我们一定要构造 `lcm = b` 的解，因为 `b` 一定 `< n`，而 `lcm` 是 `b` 的倍数，就算 `lcm = 2b` 也一定 `>= n`，舍。

我们证明了 `lcm = b` 也就是说，`a` 可以整除 `b`，这又等价于 `a` 整除 `n`。我们又要让 `lcm` 尽可能小，相当于让 `b` 尽可能小也就是 `a` 尽可能大。所以总结一下，要让 `a` 整除 `n` 并且 `a` 尽可能大，那就找 `n` 的最大的不等于 `n` 的约数就好了（~~语无伦次~~）。

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
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=61; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<int,int> pii;
const int mod=(999983); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
void Solve(){
    int n=read();
    repeat(i,2,sqrt(n)+2){
        if(n%i==0){
            cout<<n/i<<' '<<n-n/i<<endl;
            return;
        }
    }
    cout<<1<<' '<<n-1<<endl;
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## C. Omkar and Baseball

大意：问最少要多少次操作让一个排列变成 `[1,2,..,n]`。操作是，选择一个区间，重新排列使得所有区间内的数都不在原来位置上。

分三种情况讨论：原序列已经是 `[1,2,..,n]`；原序列中，有一段区间中所有元素都错位；其他情况。

这三种情况分别输出 0, 1, 2。为什么最多 2 次操作就行了呢？因为。。没想法。

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
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<int,int> pii;
const int mod=(999983); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int a[N];
void Solve(){
    int n=read();
    repeat(i,0,n){
        a[i]=read()==i+1;
    }
    a[n]=1; int cnt=0;
    repeat(i,0,n)
    if(!a[i] && a[i+1])
        cnt++;
    if(*min_element(a,a+n)==1)cout<<0<<endl;
    else if(cnt==1)cout<<1<<endl;
    else cout<<2<<endl;
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## D. Omkar and Circle

大意：环上 n 个非负数，n 是奇数，每次操作选择一个数，把这个数变成相邻两个数之和，并删除相邻两个数。求若干操作后环上的最后一个数的最大值。

首先把环断开，分析一波，发现最优情况只可能是把所有奇数位置上的数加起来。因为偶数位置的数根本不可能留到最后。那么这个结论应用到环上就是，很多“偶数”位置其实都会被抛弃，最后的答案一定是，选取恰当的位置把环断开后的奇数位置之和。（感觉是这样的）所以实现的时候只要记录奇偶位置的前缀和，然后 for 一遍即可。

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
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<int,int> pii;
const int mod=(999983); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int a[N],s[2][N];
void Solve(){
    int n=read();
    repeat(i,1,n+1){
        a[i]=read();
        s[0][i]=s[0][i-1]+(i%2==0?a[i]:0);
        s[1][i]=s[1][i-1]+(i%2==1?a[i]:0);
    }
    int ans=0;
    repeat(i,1,n+1){
        ans=max(ans,s[i%2][i]+s[i%2^1][n]-s[i%2^1][i]);
    }
    cout<<ans<<endl;
}
signed main(){
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```
