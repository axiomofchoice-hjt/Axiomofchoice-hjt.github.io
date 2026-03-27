---
title: HDOJ 6833 A Very Easy Math Problem 题解
date: 2020-08-07 01:18:00
permalink: /pages/9ce32b/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

<http://acm.hdu.edu.cn/showproblem.php?pid=6833>

$\sum\limits_{a_1=1}^{n}\sum\limits_{a_2=1}^{n}\ldots \sum\limits_{a_x=1}^{n}\left (\prod\limits_{j=1}^{x}a_j^k\right )\mu^2(\gcd(a_1,a_2,\ldots ,a_x))\cdot \gcd(a_1,a_2,\ldots ,a_x)$

可以化为 $\sum\limits_{d=1}^{n}d^{xk+1}\mu^2(d)\sum\limits_{c=1}^{n/d}\mu(c)c^{kx}[1^k+2^k+...+(n/d/c)^k]^x$.

求三个函数的前缀和然后数论分块嵌套数论分块.

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
#define fi first
#define se second
#define endl "\n"
mt19937 rnd(chrono::high_resolution_clock::now().time_since_epoch().count());
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(1?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int k,x; int s[N],sc[N],sd[N],rec[N];
int mu[N];
int block=sqrt(N);
void get_mu(){
    static int a[N]={},vis[N]={}; 
    int cnt=0; /*vis[1]=1;*/ mu[1]=1;
    repeat(i,2,N){
        if(!vis[i])a[cnt++]=i,mu[i]=-1;
        repeat(j,0,cnt){
            if(i*a[j]>=N)break;
            vis[i*a[j]]=1;
            if(i%a[j]==0){mu[i*a[j]]=0; break;}
            mu[i*a[j]]=-mu[i];
        }
    }
}
int calc(int n){
    if(rec[n]!=-1)return rec[n];
    int l0=1,r0=n,ans=0;
    for(int l=l0,r;l<=r0;l=r+1){
        r=min(r0,n/(n/l));
        int c=n/l;
        (ans+=(sc[r]-sc[l-1])*s[c])%=mod;
    }
    ans=(ans+mod)%mod; 
    return rec[n]=ans;
}
int calc2(int n){
    int l0=1,r0=n,ans=0;
    for(int l=l0,r;l<=r0;l=r+1){
        r=min(r0,n/(n/l));
        int c=n/l;
        (ans+=(sd[r]-sd[l-1])*calc(c))%=mod;
    }
    return (ans+mod)%mod;
}
void Solve(){
    int n=read();
    int ans=calc2(n);
    printf("%lld\n",ans);
}
signed main(){
    int T=1; T=read(); get_mu(); mst(rec,-1);
    k=read(),x=read();
    repeat(i,1,N)
        s[i]=(s[i-1]+qpow(i,k))%mod;
    repeat(i,1,N)
        s[i]=qpow(s[i],x);
    repeat(i,1,N)
        sc[i]=(sc[i-1]+qpow(i,k*x)*mu[i])%mod;
    repeat(i,1,N)
        sd[i]=(sd[i-1]+qpow(i,k*x+1)*abs(mu[i]))%mod;
    while(T--)Solve();
    return 0;
}
```
