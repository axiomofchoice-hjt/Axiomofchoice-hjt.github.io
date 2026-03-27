---
title: 一篇关于模拟退火的题解 abc157 F Yakiniku Optimization Problem
date: 2020-07-12 01:40:00
permalink: /pages/e19d64/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

<https://atcoder.jp/contests/abc157/tasks/abc157_f>

大意：平面上有 n 个饼，每个饼有一个属性 ci。一个饼的烤熟时间为到火源的欧几里得距离乘以 ci。求在适当的位置放置一个火源后让至少 k 个饼烤熟的最短时间。

正解：计算几何 + 二分答案。

但是我正在学习模拟退火所以走上了不归路。。。

首先确定答案的范围和精度。为了保证正确率，运行时间当然越大越好，所以确定了降温系数（大约 0.9999 到 0.99999 之间）。

模拟退火有个公式 `exp(-KD/T)`，这个参数 K 我不会调呀，算了直接设为无穷大吧（感觉如果极值点比较少的话这么做也没事）。

但是也有找到局部最优但不是全局最优的情况。我之前一直以为函数只有一个单峰，后来才发现错了，加了多次退火就立马过了~~就离谱~~。

然后我加了一个神奇机制，一旦发生状态转移就回温一下。事实证明这个机制真的有用.jpg 虽然我没怎么想通。

最后的最后，那就是多交代码了，~~因为模拟退火毕竟是个随机算法~~。

于是 emmm：

![img](https://img2020.cnblogs.com/blog/1860292/202007/1860292-20200711171812840-1503710702.png)

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
//#define int ll
struct vec{
    lf x,y;
    explicit vec(lf x=0,lf y=0):x(x),y(y){}
    vec operator-(const vec &b){return vec(x-b.x,y-b.y);}
    vec operator+(const vec &b){return vec(x+b.x,y+b.y);}
    vec operator*(lf k){return vec(k*x,k*y);}
    lf len(){return hypot(x,y);}
    lf sqr(){return x*x+y*y;}
    vec trunc(lf k=1){return *this*(k/len());}
    vec rotate(double th){lf c=cos(th),s=sin(th); return vec(x*c-y*s,x*s+y*c);}
}a[N];
ostream &operator<<(ostream &o,const vec &v){return o<<'('<<v.x<<','<<v.y<<')';}
int n,k; lf c[N],s[N];

lf E(vec v){
    repeat(i,0,n)s[i]=(a[i]-v).len()*c[i];
    nth_element(s,s+k,s+n);
    return s[k];
}

lf rndf(){return rnd()*1.0/rnd.max();}
vec rndvec(){return vec(rndf()*2-1,rndf()*2-1);}
struct state{
    vec v; lf e;
    state(vec v=vec()):v(v),e(E(v)){}
    operator lf(){
        return e;
    }
};
state solve(){
    state X; lf T=1000;
    auto work=[&](){
        state Y=X.v+rndvec()*T;
        if(Y<X){X=Y; return 1;}
        return 0;
    };
    while(T>1e-9){
        if(work()){
            work(); work();
            T*=1.1;
        }
        T*=0.99992;
    }
    return X;
}

void Solve(){
    n=read(),k=read()-1;
    repeat(i,0,n)a[i].x=read(),a[i].y=read(),c[i]=read();
    state X=solve();
    repeat(i,0,5){
        state Y=solve();
        if(X>Y)X=Y;
    }
    printf("%.10f\n",lf(X));
}
signed main(){
    int T=1; //T=read();
    while(T--)Solve();
    return 0;
}
```
