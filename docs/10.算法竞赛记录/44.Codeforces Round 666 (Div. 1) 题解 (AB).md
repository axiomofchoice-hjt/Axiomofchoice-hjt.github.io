---
title: Codeforces Round 666 (Div. 1) 题解 (AB)
date: 2020-08-31 08:36:00
permalink: /pages/bdf275/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

很水警告。

## A. Multiples of Length

因为 `a[i] - a[i] * n + a[i] * (n - 1) = 0`，我们取区间 `[1, n]` 和区间 `[1, n - 1]`，对 `a[i]` 加上 `-a[i] * n` 和 `a[i] * (n - 1)`。第三个区间取 `[n, n]` 就行了。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
ll a[N];
void Solve(){
    int n=read();
    repeat(i,0,n)a[i]=read();
    cout<<1<<' '<<n<<endl;
    repeat(i,0,n)cout<<-a[i]*n<<' '; cout<<endl;
    if(n>1){ //特判一下
        cout<<1<<' '<<n-1<<endl;
        repeat(i,0,n-1)cout<<a[i]*(n-1)<<' '; cout<<endl;
    }
    else{
        cout<<1<<' '<<1<<endl;
        cout<<0<<endl;
    }
    cout<<n<<' '<<n<<endl;
    cout<<a[n-1]*(n-1)<<endl;
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

## B. Stoned Game

如果有一堆石子数大于其他所有石子数之和，那么先手可以一直霸占这一堆，就能获胜。

反之，如果上述情况不成立，显然一直霸占的情况不会出现（整局游戏都是这样，双方不会傻到把可霸占的石子堆让对方占去），也就是说，最后一定是拿完所有石子一个不留。这时候判断一下总石子数的奇偶性即可。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
int cansel_sync=(ios::sync_with_stdio(0),cin.tie(0),0);
const int N=200010; typedef long long ll; const int inf=~0u>>2; const ll INF=~0ull>>2; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
int a[N];
void Solve(){
    int n=read(),s=0,mx=0;
    repeat(i,0,n)a[i]=read(),mx=max(mx,a[i]),s+=a[i];
    if(s-mx<mx || s%2==1)cout<<"T"<<endl;
    else cout<<"HL"<<endl;
}
signed main(){
    //freopen("data.txt","r",stdin);
    int T=1; T=read();
    repeat(ca,1,T+1){
        Solve();
    }
    return 0;
}
```

C 题应该是类似 dp 的写法，`O(n)` 吧，一般这种题目我都叫队友写（不是）。
