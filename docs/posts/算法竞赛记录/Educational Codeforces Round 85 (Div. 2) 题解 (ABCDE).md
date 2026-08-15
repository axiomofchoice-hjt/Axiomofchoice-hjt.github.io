---
title: Educational Codeforces Round 85 (Div. 2) 题解 (ABCDE)
date: 2020-04-11 09:26:00
permalink: /pages/b58848/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1334)

## A. Level Statistics

抓住两个性质，一是游戏次数和通关次数是单调不减的，二是相邻游戏次数的变化量大于等于对应的通关次数变化量。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n;
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        bool f=1;
        int a=-1,b=-1;
        while(n--){
            int aa,bb; cin>>aa>>bb;
            if(aa<a || bb<b)f=false;
            if(aa-a<bb-b)f=false;
            a=aa,b=bb;
        }
        cout<<(f?"YES":"NO")<<endl;
    }
    return 0;
}
```

## B. Middle Class

（~~财富液化委员会~~，雾）

如果把财富倒序排序后，前 k 个人财富液化后的财富随着 k 单调不增的，因此 for 一遍找到最大的 k 即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,x;
int a[N],s,ans;
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>x;
        repeat(i,1,n+1){
            cin>>a[i];
        }
        sort(a+1,a+1+n,greater<int>());
        s=ans=0;
        repeat(i,1,n+1){
            s+=a[i];
            if(s*1.0/i>=x)ans=i;
        }
        cout<<ans<<endl;
    }
    return 0;
}
```

## C. Circle of Monsters

先把所有怪的血量降至前一个怪的爆炸伤害以内（如果小于就不用降了），然后 for 一遍，看看打死第 i 个怪的额外需要的伤害（因为只要死一个怪就能连环炸死所有怪），取最小。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=300010; typedef long long ll; const ll INF=~0ull>>2;
#define int ll
int T,n,x;
int a[N],b[N];
signed main(){
    cin>>T;
    while(T--){
        cin>>n;
        int cost=0;
        repeat(i,0,n){
            cin>>a[i]>>b[i];
        }
        rotate(b,b+n-1,b+n); //rotate 使得怪 i 收到的爆炸伤害是 b[i]
        repeat(i,0,n){
            if(a[i]>b[i])cost+=a[i]-b[i];
        }
        int ans=INF*2;
        repeat(i,0,n){
            int now=0;
            if(a[i]>b[i])now+=-(a[i]-b[i]);
            now+=a[i];
            ans=min(ans,now);
        }
        cout<<cost+ans<<endl;
    }
    return 0;
}
```

## D. Minimum Euler Cycle

如果把 `n=5` 画个图，会发现欧拉序列长这样：

```text
[1,2,1,3,1,4,1,5]+[2,3,2,4,2,5]+[3,4,3,5]+[4,5]+[1]
```

（都帮你分割好了）

`[...]` 当成一个区间，区间个数 `O(n)`，因此 for 一遍也没大问题，如果区间和询问区间有相交就在区间内 for 一遍输出即可，特判最后一个区间。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll;
#define int ll
int T,n,l,r,rr;
void work(int a,int l,int r){
    int cnt=0;
    repeat(i,a+1,n+1){
        cnt++; if(l<=cnt && cnt<=r)printf("%lld ",a);
        cnt++; if(l<=cnt && cnt<=r)printf("%lld ",i);
    }
}
signed main(){
    cin>>T;
    while(T--){
        cin>>n>>l>>rr; r=min(rr,n*(n-1));
        if(l<=r){
            int x=(n-1)*2;
            while(x<l)l-=x,r-=x,x-=2;
            while(r>0){
                work(n-x/2,l,r);
                l-=x,r-=x;
                x-=2;
            }
        }
        if(rr==n*(n-1)+1)printf("1");
        puts("");
    }
    return 0;
}
```

## E. Divisor Paths

有一个有用的性质就是所有数的质因数都包含在 `D` 的质因数集合内，`D` 质因数个数不会超过 30，因此放心大胆地枚举质因数吧/xyx。

进入正题，经过冷静分析，我们发现如果 `a1` 经过 `a2...a{k-1}` 走到 `ak`，而且一路上编号严格单增，长度是 `d(a2)-d(a1)+d(a3)-d(a2)+...+d(ak)-d(a{k-1})` `=d(ak)-d(a1)`（`d(n)` 表示 `n` 的因数个数），和中间结点无关！而且可以猜到这是最短路径。最短路径的个数，可以回想多重集组合数 `((X; x1, ..., xn)) = X! / (∏(xi!))`，~~有点不太好说~~，举个例子，如果从 `1` 走到 `12`，乘以 `[2,2,3]` 或者 `[2,3,2]` 或者 `[3,2,2]` 都行，所以答案应该是路径长度的阶乘，除以 2 个数的阶乘，除以 3 个数的阶乘，`ans = 3! / (1! * 2!) = 3`。

当然问题还没解决，上述操作只能解决 `a1|ak`（或者 `ak|a1`）的情况，如果不是整除关系呢？直觉告诉我们路径经过 `gcd(a1, ak)`，问题就拆分为 `a1` 到 `gcd(a1, ak)` 的路径计数和 `gcd(a1, ak)` 到 `ak` 的路径计数，套用之前结论即可。至于原因嘛，~~我不太会证~~，~~感觉不这么走会多好多路~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int mod=(0?1000000007:998244353); ll mul(ll a,ll b,ll m=mod){return a*b%m;} ll qpow(ll a,ll b,ll m=mod){ll ans=1; for(;b;a=mul(a,a,m),b>>=1)if(b&1)ans=mul(ans,a,m); return ans;}
#define int ll
int T,n,l,r,rr;
vector<int> d;
map<int,vector<int>> a;
struct CC{
    static const int N=1010;
    ll fac[N],inv[N];
    CC(){
        fac[0]=1;
        repeat(i,1,N)fac[i]=fac[i-1]*i%mod;
        inv[N-1]=qpow(fac[N-1],mod-2,mod);
        repeat_back(i,0,N-1)inv[i]=inv[i+1]*(i+1)%mod;
    }
}C;
void getdivisor(vector<int> &ans,int n){
    ans.assign(d.size(),0);
    repeat(i,0,d.size())
    while(n%d[i]==0)n/=d[i],ans[i]++;
}
vector<int> X,Y;
signed main(){
    int n=read(),q=read();
    for(int i=2;i*i<=n;i++){
        if(n%i==0)d.push_back(i);
        while(n%i==0)n/=i;
    }
    if(n>1)d.push_back(n);
    while(q--){
        int x=read(),y=read();
        getdivisor(X,x);
        getdivisor(Y,y);
        
        int ans=1,sum=0;
        repeat(i,0,d.size())
        if(X[i]>Y[i])
            ans=ans*C.inv[abs(X[i]-Y[i])]%mod,
            sum+=abs(X[i]-Y[i]);
        ans=ans*C.fac[sum]%mod;
        
        sum=0;
        repeat(i,0,d.size())
        if(X[i]<Y[i])
            ans=ans*C.inv[abs(X[i]-Y[i])]%mod,
            sum+=abs(X[i]-Y[i]);
        ans=ans*C.fac[sum]%mod;
        
        cout<<ans%mod<<endl;
    }
    return 0;
}
```
