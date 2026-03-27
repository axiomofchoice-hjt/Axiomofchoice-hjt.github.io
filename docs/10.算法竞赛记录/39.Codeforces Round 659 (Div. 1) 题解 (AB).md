---
title: Codeforces Round 659 (Div. 1) 题解 (AB)
date: 2020-07-25 08:43:00
permalink: /pages/64adc3/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

水个题解压压惊。

## A. String Transformation 1

贪心就好了。每次选择所有 A 里最小的、需要改变的字符，然后改变成最小的对应 B 值，差不多这个意思吧（？）。

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
int a[20][20];
char A[N],B[N];
void Solve(){
    int n=read();
    scanf("%s%s",A,B); mst(a,0);
    repeat(i,0,n){
        if(A[i]>B[i]){
            puts("-1");
            return;
        }
        a[A[i]-'a'][B[i]-'a']++;
    }
    n=20; int ans=0;
    repeat(i,0,n-1){
        int t=inf;
        repeat(j,i+1,n)
        if(a[i][j]){
            t=min(t,j);
        }
        if(t!=inf){
            ans++;
            repeat(j,i+1,n)
                a[t][j]+=a[i][j];
        }
    }
    printf("%d\n",ans);
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## B. GameGame

大意：n 个数，两人轮流选，选完为止，谁选的数字异或和最大谁就获胜，问先手必胜/和局/必败？

首先设 `s` 为所有数的异或和。如果 `s` 是 0，那么不管怎么选，两人分数一定相同，就和局。如果不和局的话，两人的获胜关键就是 `s` 的最高位（二进制）。谁拿走了奇数个含有 `s` 最高位的数，谁就获胜（因为对面一定拿了偶数个）。

我们令 `cnt1` 为含有 `s` 最高位的数的个数，`cnt0` 为 `n-cnt1`，接下来分情况讨论。

- 如果 `cnt1%4==1`，那么必胜，策略是先拿一个 `cnt1`，然后看后手操作，如果后手拿 `cnt1`，你也拿 `cnt1`，后手拿 `cnt0` 你也拿 `cnt0`（如果有的话）。这样保证你一定能拿奇数个 `cnt1`。
- 如果 `cnt1%4==3` 且 `n%2==0`，那么必胜，策略是先拿一个 `cnt0`，然后操作同第一种情况。因为后手拿最后一个数，这样操作保证后手拿最后一个 `cnt1`。
- 如果 `cnt1%4==3` 且 `n%2!=0`，那么必败。因为先手一定拿最后一个数，后手只要模仿先手操作（同前两种情况），就能获胜。

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
int a[N],cnt[2];
void Solve(){
    int n=read(),s=0;
    repeat(i,0,n){
        a[i]=read();
        s^=a[i];
    }
    if(s==0){puts("DRAW"); return;}
    int b=1<<(31-__builtin_clz(s)); //orz(b);
    mst(cnt,0);
    repeat(i,0,n)cnt[bool(a[i]&b)]++;
    if(cnt[1]%4==1 || n%2==0)puts("WIN");
    else puts("LOSE");
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```
