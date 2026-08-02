---
title: Educational Codeforces Round 91 (Div. 2) 题解 (ABCD)
date: 2020-07-13 09:07:00
permalink: /pages/79510c/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

又水了 4 道题。

## A. Three Indices

感觉乱搞吧。

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
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
int a[N],l[N],r[N];
void Solve(){
    int n=read();
    repeat(i,0,n)a[i]=read();
    l[0]=0;
    repeat(i,1,n)l[i]=a[l[i-1]]<a[i]?l[i-1]:i;
    r[n-1]=n-1;
    repeat_back(i,0,n-1)r[i]=a[r[i+1]]<a[i]?r[i+1]:i;
    repeat(i,1,n-1){
        if(a[l[i-1]]<a[i] && a[r[i+1]]<a[i]){
            cout<<"YES"<<endl;
            cout<<l[i-1]+1<<' '<<i+1<<' '<<r[i+1]+1<<endl;
            return;
        }
    }
    cout<<"NO"<<endl;
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## B. Universal Solution

完全可以只出一个招式，只要这个招式克制对方出的最多的那个招式。

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
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
char s[N];
int cnt[256];
void Solve(){
    scanf("%s",s);
    mst(cnt,0);
    for(int i=0;s[i];i++)
        cnt[(int)s[i]]++;
    char c=max_element(cnt,cnt+256)-cnt;
    if(c=='R')c='P';
    else if(c=='P')c='S';
    else c='R';
    for(int i=0;s[i];i++)putchar(c);
    puts("");
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## C. Create The Teams

大意：尽可能地组队，要求每个队伍的人数乘以能力最低值大于等于 `x`。

贪心一下嘛，从能力大的开始选（因为这样需要人数是单调递减的）。

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
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
int a[N];
void Solve(){
    int n=read(),x=read();
    repeat(i,0,n)a[i]=read(),a[i]=(x+a[i]-1)/a[i];
    sort(a,a+n);
    int pre=0,ans=0;
    repeat(i,0,n){
        if(a[i]<=i-pre+1){
            pre=i+1;
            ans++;
        }
    }
    cout<<ans<<endl;
}
signed main(){
    int T=1; T=read();
    while(T--)Solve();
    return 0;
}
```

## D. Berserk And Fireball

大意：`n` 个战士排成一排，分别有个武力值 `ai`。你有两种法术，一个是火球（花费 `x` 个法力，消灭连续 `k` 个战士），一个是激怒（花费 `y` 个法力，选择相邻两个战士，武力值大的会消灭武力值小的）。求最后留下的战士排列成 `bi` 需要的最小法力花费（我的翻译水平咋样？）。

很显然，`ai` 中会有一些战士需要留下来。考虑一个区间，区间内的所有战士需要被消灭，两端都要留下来，那么只要考虑 3 种可能的施法方法：

1. 如果两端存在武力值大于区间内所有战士的战士，那么可以用这个牛逼战士干掉所有战士，花费 `len*y`。
2. 如果使用火球比较划算，那么只要 `len>=k` 就能先使用 `len%k` 次激怒，然后使用 `len/k` 次火球，让使用火球次数最大化。
3. 如果使用激怒比较划算，那么用方案 1 当然最好。如果方案 1 不能用，那么只要 `len>=k` 就能先使用 `len-k` 次激怒，然后使用 1 次火球，让使用激怒次数最大化。

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
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int a[N],b[N],n,m,x,k,y,ans;
void work(int l,int r){
    if(l>r)return;
    int len=r-l+1;
    int res=INF;
    if(*max_element(a+l,a+r+1)<max(a[l-1],a[r+1])){
        res=min(res,len*y);
    }
    if(len>=k){
        res=min(res,x+(len-k)*y);
        res=min(res,len/k*x+(len%k)*y);
    }
    if(res==INF)cout<<-1<<endl,exit(0);
    ans+=res;
}
void Solve(){
    n=read(),m=read(),x=read(),k=read(),y=read();
    repeat(i,1,n+1)a[i]=read(); a[0]=a[n+1]=-1;
    repeat(i,1,m+1)b[i]=read(); b[m+1]=-1;
    int t=1,pre=1;
    repeat(i,1,n+1)
    if(a[i]==b[t])
        work(pre,i-1),pre=i+1,t++;
    work(pre,n);
    if(t!=m+1)cout<<-1<<endl,exit(0);
    cout<<ans<<endl;
}
signed main(){
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```
