---
title: Codeforces 1312 div2 被教育场 题解 (ABCDE)
date: 2020-03-10 09:11:00
permalink: /pages/d99bd8/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1312/)

## A. Two Regular Polygons

这题是用来测网速的。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=100010;
#define int ll
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int T=read();
    while(T--){
        int a=read(),b=read();
        cout<<(a%b==0?"YES":"NO")<<endl;
    }
    return 0;
}
```

## B. Bogosort

倒着排序输出即可。

测网速和手速。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=100010;
#define int ll
int a[N];
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int T=read();
    while(T--){
        int n=read();
        repeat(i,0,n)a[i]=read();
        sort(a,a+n,greater<int>());
        repeat(i,0,n)
            cout<<a[i]<<' ';
        cout<<endl;
    }
    return 0;
}
```

## C. Adding Powers

第 $i$ 步只能加 $k^i$，这意味着所有数的 $k$ 进制的每一位必须都只能是 $0$ 或者 $1$（如果第 $p$ 位有 $2$ 那么这个数要加两次 $k^p$，不可能），并且没有两个数字的同一位是 $1$。

还是要一定代码能力的。

（我竟然因为与门短路机制导致 `read()` 函数未执行，re 了一发嘤嘤嘤菜出天际，没事用什么 `&&` 啊。）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=100010;
#define int ll
int f[64],k;
bool trans(int n){ //如果返回0意味着出错了（答案一定是NO）
    int i=0;
    while(n){
        if(n%k>1)return 0;
        if(n%k==1){
            if(f[i])return 0;
            f[i]=1;
        }
        i++; n/=k;
    }
    return 1;
}
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int T=read();
    while(T--){
        int n=read(); k=read();
        mst(f,0);
        bool f=true;
        repeat(i,0,n){
            f=trans(read()) && f; //就是这个与门qwq
        }
        cout<<(f?"YES":"NO")<<endl;
    }
    return 0;
}
```

## D. Count the Arrays

推一波柿子就可以啦～～。

首先生成一个长度为 $n-1$ 的递增序列（每个元素不大于 $m$），这样的序列有 $C_{m}^{n-1}$ 个。

然后在右边加一个元素，这个元素等于前 $n-2$ 个元素中任意一个，新序列有 $C_m^{n-1}(n-2)$ 个。

然后有 $n-3$ 个元素（除了最大值和相等的那两个的其他所有）可以跑到最大值的右边去，最后只要对最大值右边的序列降序排序就满足要求了，因此最后答案是 $C_m^{n-1}(n-2)\cdot 2^{n-3}$。

组合数啊，快速幂啊这种板子套上去就行了。

最后 $n=2$ 的情况要特判（因为这个我 tle 一发，太难顶了）。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=100010;
const int mod=(0?1000000007:998244353);
ll mul(ll a,ll b,ll m=mod){return a*b%m;}
ll qpow(ll a,ll b,ll m=mod){
    ll ans=1;
    for(;b;a=mul(a,a,m),b>>=1)
        if(b&1)ans=mul(ans,a,m);
    return ans;
}
ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
#define int ll
struct CC{ //线性递推组合数板子
    static const int N=200010;
    ll fac[N],inv[N]; //fac[i]等于i!，inv[i]等于1/i!
    CC(){
        fac[0]=1;
        repeat(i,1,N)fac[i]=fac[i-1]*i%mod;
        inv[N-1]=qpow(fac[N-1],mod-2,mod);
        repeat_back(i,0,N-1)inv[i]=inv[i+1]*(i+1)%mod;
    }
    ll operator()(ll a,ll b){ //a>=b
        if(a<b || a<0)return 0;
        return fac[a]*inv[a-b]%mod*inv[b]%mod;
    }
}C;
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int n=read(),m=read();
    int cnt=C(m,n-1);
    cnt=mul(cnt,n-2);
    if(n<3)cnt=0,n=3;
    cnt=mul(cnt,qpow(2,n-3));
    cout<<(cnt+mod)%mod<<endl;
    return 0;
}
```

## E. Array Shrinking

更：（~~这是一个 2048 游戏~~）

众所周知区间 dp 有 $O(n^3)$ 的复杂度，$n$ 范围又这么大，不是 cf 神机还真不敢去试。

首先要计算出那些区间能缩到一点，类似区间 dp 的写法，复杂度是 $O(n^3)$，然后所有这样的区间可以看作左端点向右端点的右边一个点连一条边，这样跑一遍最短路，而且这个图是天然拓扑排序好的，因此最短路 $O(n^2)$ 就可以跑完。

区间 dp 怎么写看代码的注释吧。

再更：施老师有 $O(n^2)$ 算法，在刘老师博客中可以去看看 <http://www.willingox555.cn/archives/199>。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
#define mst(a,x) memset(a,x,sizeof(a))
typedef long long ll; const int inf=~0u>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=501;
#define int ll
int rec[N][N]; //如果==-1表示[l,r]未知，否则记录calc的返回值（记忆化搜索嘛）
int calc(int l,int r){ //区间dp的递归写法，==0表示[l,r]不能缩成一点，否则表示[l,r]缩完后的值
    int &x=rec[l][r];
    if(x!=-1)return x;
    int t;
    repeat(i,l,r)
    if((t=calc(l,i))==calc(i+1,r) && t>0){ //如果都能缩成一点且相等
        return x=t+1; //一般区间dp都是x=max(x,...)这种写法，这题比较特殊就直接return了
    }
    return x=0;
}
int dis[N]; //0到i的最短路长度
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    mst(rec,-1);
    int n=read();
    repeat(i,0,n)rec[i][i]=read();
    fill(dis,dis+n+1,inf); dis[0]=0;
    repeat(i,0,n)
    repeat(j,i,n)
    if(calc(i,j)>0){ //i到j+1有一条边
        dis[j+1]=min(dis[j+1],dis[i]+1);
    }
    cout<<dis[n]<<endl;
    return 0;
}
```
