---
title: Educational Codeforces Round 88 (Div. 2) 题解 (ABCDE)
date: 2020-05-29 08:47:00
permalink: /pages/1992f7/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

<https://codeforces.com/contest/1359>

## A. Berland Poker

大概就是把 jokers 尽可能多地给一个人，其他人平均分吧。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,m,k;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m>>k;
        if(n/k>=m)cout<<m<<endl;
        else{
            int t=(m-n/k+k-1-1)/(k-1);
            cout<<n/k-t<<endl;
        }
    }
    return 0;
}
```

## B. New Theatre Square

没什么好说的，就模拟。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,m,a,b;
string s;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>m>>a>>b; b=min(b,2*a);
        int ans=0;
        repeat(i,0,n){
            cin>>s;
            repeat(j,0,m)
            if(s[j]=='.'){
                if(j!=m-1 && s[j+1]=='.'){
                    s[j+1]='*';
                    ans+=b;
                }
                else ans+=a;
            }
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## C. Mixing Water

哭哭~，写得我整个人都不好了，最后还是放弃（赛后，`double` 改成 `long double` 交了一下过了。但是不保证不会 fst，就先放这吧）。

初步分析，如果 `t` 比较小那就直接输出 2，否则就是一个奇数，比较麻烦。如果不断 +2 来找答案就超时了 (TLE test4)，因此我直接考虑推柿子。

当然也可以二分答案（%%%猛男 lzj 提供的思路）。

我的解法：

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
typedef long double lf;
int T,h,c,t;
signed main(){
    cin>>T;
    while(T--){
        cin>>h>>c>>t;
        if(t<=(h+c)/2){cout<<2<<endl; continue;}
        lf t2=(t-lf(h+c)/2)/(h-c);
        lf t3=floor(1/(4*t2)-0.5);
        int x=llround(t3),y=x+1;
        if(abs(lf(1)/(4*x+2)-t2)<=abs(lf(1)/(4*y+2)-t2))
            cout<<x*2+1<<endl;
        else
            cout<<y*2+1<<endl;
    }
    return 0;
}
```

## D. Yet Another Yet Another Task

先固定最大值，如果最大值固定（设它为 `k`）那么这时候的答案就是 (去掉比最大值大的数后的) 最大连续子序列和减去 `k`，即 `max\limits_{(l,r)}\sum\limits_{i=l}^r a[i]-k`，非常好求。

所以只要 `for k=30 downto -30` 就行了，然后里面 `for` 一遍就行了。

更加猛的方法是，每次插入未插入的最小的 `a_i`，线段树维护最大子序列和（考虑到有些读者没接触过就讲一下，线段树的每个节点存三个值，答案、可以向左延伸的答案、可以向右延伸的答案（区间和可能也要））。当然了，这种方法在 `a_i` 范围很大的时候也适用。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int n,a[N];
signed main(){
    cin>>n;
    repeat(i,0,n)cin>>a[i];
    int ans=0;
    repeat_back(k,-30,30+1){
        int now=-1e9;
        repeat(i,0,n){
            if(now<0)now=a[i];
            else now+=a[i];
            ans=max(ans,now-k);
        }
        repeat(i,0,n)if(a[i]==k)a[i]=-1e9;
    }
    cout<<ans<<endl;
    return 0;
}
```

## E. Modular Stability

搞了一会儿发现隐藏大结论，所有 `a_i` 必须能被最小值 `a_1` 整除。为什么呢？因为。啊没想明白，不会证（更：取一个不能被 `a_1` 整除的 `a_t`，再取 `x=a_t`，显然 `x\%a_1\%a_t\not=0,x\%a_t\%a_1=0`，证毕）。

这样的话，只要枚举 `a_1` 的值，然后计算组合数就行了。发现结论后剩下的步骤挺水的。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;} ll getinv(ll v,ll m=mod){return qpow(v,m-2,m);}
#define int ll
int n,k;
struct CC{
    static const int N=500010;
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
signed main(){
    cin>>n>>k; int ans=0;
    repeat(i,1,n+1){
        (ans+=C(n/i-1,k-1))%=mod;
    }
    cout<<ans<<endl;
    return 0;
}
```
