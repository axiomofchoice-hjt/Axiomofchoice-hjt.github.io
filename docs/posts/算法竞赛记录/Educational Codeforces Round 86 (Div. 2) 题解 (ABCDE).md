---
title: Educational Codeforces Round 86 (Div. 2) 题解 (ABCDE)
date: 2020-04-27 08:51:00
permalink: /pages/68b9ed/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1342)

## A. Road To Zero

o(*≧▽≦)ツ

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
#define int ll
int T,x,y,a,b;
signed main(){
    cin>>T;
    while(T--){
        cin>>x>>y;
        cin>>a>>b;
        int ans=0;
        if(2*a>b){
            if(x>0 && y>0){
                int t=min(x,y);
                ans+=t*b;
                x-=t;
                y-=t;
            }
            if(x<0 && y<0){
                int t=min(-x,-y);
                ans+=t*b;
                x+=t;
                y+=t;
            }
        }
        ans+=a*(abs(x)+abs(y));
        cout<<ans<<endl;
    }
    return 0;
}
```

## B. Binary Period

(*^▽^*)

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
#define int ll
int T;
string s;
signed main(){
    cin>>T;
    while(T--){
        cin>>s;
        bool a0=1,a1=1;
        repeat(i,0,s.length()){
            if(s[i]=='1')a0=0;
            if(s[i]=='0')a1=0;
        }
        if(a0 || a1)cout<<s;
        else
        repeat(i,0,s.length())
            cout<<"01";
        cout<<endl;
    }
    return 0;
}
```

## C. Yet Another Counting Problem

好了，正片开始。

事实上，`(x mod a)` 是有周期性的，周期为 `a`，`(x mod b)` 的周期为 `b`，那么 `g(x)=f(x mod a,x mod b)` 呢？显而易见，`ab` 一定是 `g(x)` 的其中一个周期。

那么我们令 `g(x)=[x mod a mod b != x mod b mod a]`，只要维护 `g(x)` 的一个周期（长为 `ab`），就能很快算出 `∑_{i=l}^{r} g(x)` 了。

（一定有人想问为什么不说人话，要不……直接看代码吧？逃）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=100010; typedef long long ll;
#define int ll
int T;
int s[N];
int a,b,q;
int work(int x){
    return x/(a*b)*s[a*b]+s[x%(a*b)];
}
signed main(){
    cin>>T;
    while(T--){
        cin>>a>>b>>q;
        repeat(i,1,a*b+1)
            s[i]=s[i-1]+(i%a%b!=i%b%a); //g(x)的前缀和
        while(q--){
            int x,y; cin>>x>>y;
            cout<<work(y)-work(x-1)<<' ';
        }
        cout<<endl;
    }
    return 0;
}
```

## D. Multiple Testcases

一波巧妙的构造，差点被自己惊艳到/xyx（huge fog）。

事实上第一个应该求出的是 `ans`。先让 `{m[i]}` 升序排列，如果要将大于等于 `m[i]` 的所有数存起来，那么一定需要 `⌈ (n-i+1)/c[m[i]] ⌉` 个数据点（大于等于 `m[i]` 的数有 `n-i+1` 个），取它们的最大值 `max_{i=1}^{n} ⌈ (n-i+1)/c[m[i]] ⌉` 就是 `ans` 了。

然后需要构造出怎么存数据点，直接轮流放置即可，即 `m[1]` 放第 `1` 个， `m[2]` 放第 `2` 个，……，`m[ans]` 放第 `ans` 个，`m[ans+1]` 放第 `1` 个，……，`m[k*ans+t]` 放第 `t` 个。这个巧妙（雾）的设计可以避免过载，虽然暂时不确定这个方法是不是有锅/kk。

证明？证明是不存在的，~~不然我现在也不会这么慌~~。

更：杨老师提供了证明（%%%tql）。

> 就 考虑从头到尾放置 其实是 1.2.3...ans 然后回到 1.2.3... 这样从头到尾放过来
> 1.2.3..ans 指的是最后的答案
> 在放置的过程中 如果有超过限制的个数出现 比如 8 之前只能放 3 个   总共有 5 个容器可以放 但是第一个容器放了 4 个
> 这时候说明 8 之前数的个数的肯定超过了 3*5+1 个 答案就肯定不止 5 个容器了

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int a[N],c[N];
int n,k,ans;
signed main(){
    cin>>n>>k;
    repeat(i,1,n+1)cin>>a[i]; sort(a+1,a+n+1);
    repeat(i,1,k+1)cin>>c[i];
    repeat(i,1,n+1)ans=max(ans,(n-i+1+c[a[i]]-1)/c[a[i]]);
    cout<<ans<<endl;
    repeat(i,1,ans+1){
        int cnt=0;
        for(int j=i;j<=n;j+=ans)
            cnt++;
        cout<<cnt<<' ';
        for(int j=i;j<=n;j+=ans)
            cout<<a[j]<<' ';
        cout<<endl;
    }
    return 0;
}
```

## E. Placing Rooks

首先有一个重要的结论，即每一行都一个车/每一列都有一个车，两者至少满足其一。如果不满足，那么我们写出它的相反命题，即存在一行无车并且存在一列无车，显然不满足题意，QED。

那么先假设车占据了任一列。经过简单操作发现，所有车占据的行数恰好等于 `n-k`，证明略，不相信的可以画个棋盘搞一下（雾）。

然后我用了容斥，先选择 `n-k` 行（`C_{n}^{n-k}` 种情况），在列互不相同的情况下每个棋子都无脑放入这 `n-k` 行（`(n-k)^n` 种情况），显然会多出有空行的情况，所以要减去至少有 `1` 个空行（`(n-k-1)^n C_{n-k}^{1}` 种情况），加上至少有 `2` 个空行（`(n-k-2)^n C_{n-k}^{2}` 种情况），减去至少有 `3` 个空行，……公式为 `C_{n}^{n-k}[(n-k)^n-(n-k-1)^n C_{n-k}^{1}+(n-k-2)^n C_{n-k}^{2}-...]`（注：“至少有 `1` 个空行”“至少有 `2` 个空行”等等这些情况是有重复的，所以之后会一加一减来平衡）（很难懂吧，我也觉得，我很久之前就想学容斥专题了，咕到现在）。

当然我们刚好考虑一半（注：上面只考虑了车占据任一列的情况，任一行的情况显然数目相同），所以要乘 2。但是但是，`k=0` 就不用乘 2，特判一下，`k>n` 也要特判一下不然 `n-k` 是负数了。

更：好像是第二类斯特林数 qwq，我组合数学还是太菜了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i++)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
#define int ll
struct CC{
    static const int N=200010;
    ll fac[N],inv[N];
    CC(){
        fac[0]=1;
        repeat(i,1,N)fac[i]=fac[i-1]*i%mod;
        inv[N-1]=qpow(fac[N-1],mod-2,mod);
        repeat_back(i,0,N-1)inv[i]=inv[i+1]*(i+1)%mod;
    }
    ll operator()(ll a,ll b){ //a>=b
        if(a<b)return 0;
        return fac[a]*inv[a-b]%mod*inv[b]%mod;
    }
}C;
int a[N],c[N];
int n,k,ans;
signed main(){
    cin>>n>>k;
    if(k>=n)cout<<0<<endl,exit(0);
    if(k==0)cout<<C.fac[n]<<endl,exit(0);
    repeat(i,0,n-k+1){
        if(i%2==0)ans+=qpow(n-k-i,n)*C(n-k,i)%mod;
        else ans-=qpow(n-k-i,n)*C(n-k,i)%mod;
    }
    ans%=mod;
    (ans*=C(n,n-k))%=mod;
    (ans*=2)%=mod;
    cout<<(ans+mod)%mod<<endl;
    return 0;
}
```
