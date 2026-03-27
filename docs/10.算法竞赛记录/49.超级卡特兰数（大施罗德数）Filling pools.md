---
title: 超级卡特兰数（大施罗德数）Filling pools
date: 2020-10-15 06:06:00
permalink: /pages/1fb0db/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

超级卡特兰数 $S_n$ 表示 $(0,0)$ 走到 $(n,n)$ 方案数，只能往右、上、右上走，且移动时始终满足 $y\le x$。

其前几个数 $S_{0..10}=1, 2, 6, 22, 90, 394, 1806, 8558, 41586, 206098, 1037718$。

根据定义，分为两种情况。如果第一步往右走，我们令 $k$ 为接下来第一次接触 $y=x$ 这条线的位置（$0<k\le n$）。显然问题可以分为两个部分，即 $(1,0)$ 走到 $(k,k-1)$ 以及 $(k,k)$ 走到 $(n,n)$，这两个部分都是超级卡特兰数，因此答案是 $S_{k-1}S_{n-k}(k=1...n)$。第二种情况，如果第一步往右上走，那么问题就变成 $(1,1)$ 走到 $(n,n)$，答案就是 $S_{n-1}$。

由上述分析，得到超级卡特兰数的递推公式 $\displaystyle S_n=S_{n-1}+\sum_{k=0}^{n-1}S_kS_{n-1-k}$（这里的 $k$ 和上面有点不同，不管了）。

（假设我们不知道超级卡特兰数的其他公式）如果直接计算，复杂度 $O(n^2)$，容易 t。考虑分治 FFT，先处理 $S_0..S_{n/2-1}$，然后计算 $S_0..S_{n/2-1}$ 对 $S_{n/2}..S_{n-1}$ 的贡献（这里需要用到类似前缀和的操作），最后处理 $S_{n/2}..S_{n-1}$。复杂度 $O(n\log^2 n)$，类似递推公式都可以分治 FFT，~~就是脑子有点不够用~~。

当然，这个数列还是有点东西的。通过查询 oeis，发现 $O(n)$ 就可以计算 $S_n$，我整理出下面两个公式：

- $F_0=S_0,2F_i=S_i,F_n=\dfrac{(6n-3)F_{n-1}-(n-2)F_{n-2}}{n+1}$
- $\displaystyle S_n=\dfrac{1}{n}\sum_{k=1}^n2^kC_n^kC_n^{k-1},n\ge1$

***

例题：<https://ac.nowcoder.com/acm/problem/16846>

答案是超级卡特兰数，可以当个板子题。（分治 FFT 也能过）不过我还是无法证明为什么是超级卡特兰数。

提供个分治 FFT 的代码。

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
const int N=800010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;} typedef double lf; const lf pi=acos(-1.0); lf readf(){lf x; if(scanf("%lf",&x)==-1)exit(0); return x;} typedef pair<ll,ll> pii; template<typename T> void operator<<(vector<T> &a,T b){a.push_back(b);}
const ll mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
//#define int ll
inline ll D(ll x){return x>=mod?x-mod:x<0?x+mod:x;}
inline ll &ad(ll &x){return x=D(x);}
int polyinit(ll a[],int n1){
    int n=1; while(n<n1)n<<=1;
    fill(a+n1,a+n,0);
    return n;
}
void ntt(ll a[],ll n,ll op){
    for(int i=1,j=n>>1;i<n-1;++i){
        if(i<j)swap(a[i],a[j]);
        int k=n>>1;
        while(k<=j)j-=k,k>>=1;
        j+=k;
    }
    for(int len=2;len<=n;len<<=1){
        ll rt=qpow(3,(mod-1)/len);
        for(int i=0;i<n;i+=len){
            ll w=1;
            repeat(j,i,i+len/2){
                ll u=a[j],t=1ll*a[j+len/2]*w%mod;
                a[j]=D(u+t),a[j+len/2]=D(u-t);
                w=1ll*w*rt%mod;
            }
        }
    }
    if(op==-1){
        reverse(a+1,a+n);
        ll in=qpow(n,mod-2);
        repeat(i,0,n)a[i]=1ll*a[i]*in%mod;
    }
}
void conv(ll a[],ll b[],int n,ll c[],const function<ll(ll,ll)> &f=[](ll a,ll b){return a*b%mod;}){ //n=2^k
    //fill(a+n,a+n*2,0); fill(b+n,b+n*2,0); n*=2;
    ntt(a,n,1); ntt(b,n,1);
    repeat(i,0,n)c[i]=f(a[i],b[i]);
    ntt(c,n,-1);
}
ll f[N],GG[N],FF[N],f0[N];
void work(int l,int r){
    if(r-l==1)return;
    int m=(l+r)/2;
    work(l,m);
    copy(f,f+r-l,GG+1); GG[0]=0;
    copy(f+l,f+m,FF+l); fill(FF+m,FF+r,0);
    conv(GG,FF+l,r-l,FF+l);
    int t=1+(l!=0);
    repeat(i,m,r)
        (f0[i]+=f0[i-1]+FF[i]*t)%=mod;
    ad(f0[r]+=f0[r-1]);
    repeat(i,m,r)
        ad(f[i]+=f0[i]),f0[i]=0;
    work(m,r);
}
void Solve(){
    int n1=262144;
    int n=polyinit(f,n1+1);
    f[0]=f0[0]=1; work(0,n);
    cout<<f[read()-1]<<endl;
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
